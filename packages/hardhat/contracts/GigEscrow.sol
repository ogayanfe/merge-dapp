//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

enum VerificationMode {
    RepoValidation,
    ManualValidation
}

enum EscrowState {
    OPEN,
    APPLIED,
    LOCKED,
    IN_REVIEW,
    DISPUTED,
    COMPLETED,
    CANCELLED
}

contract GigEscrow {
    // ERRORS
    error NotAuthorised();
    error InvalidForContractState();
    error InvalidContractEthValue();
    error PaymentFailed();

    // EVENTS
    event ApplicationRecieved(address client, address applicant, uint256 timestamp);
    event JobSubmitted(address freelancer, uint256 timestamp, VerificationMode mode);
    event DisputeRaised(address client, uint256 timestamp, VerificationMode mode);

    // STATE VARIABLES
    address public client;
    address public freelancer;
    address public arbiter;
    string public IPFSHash;
    string public repoURL;
    uint256 public deployTime;
    address[] public applicants;
    EscrowState public state;
    uint256 autoReleaseDeadline;
    VerificationMode public verificationMode;

    // CONSTANTS
    uint256 public constant reviewWindow = 1 weeks;
    uint256 public constant disputePercent = 0.01 ether; // 1% of 1 ETH

    modifier onlyClient() {
        if (msg.sender != client) revert NotAuthorised();
        _;
    }

    modifier onlyFreelancer() {
        if (msg.sender != freelancer) revert NotAuthorised();
        _;
    }

    modifier onlyArbiter() {
        if (msg.sender != arbiter) revert NotAuthorised();
        _;
    }

    modifier inState(EscrowState _state) {
        if (_state != state) revert InvalidForContractState();
        _;
    }

    constructor(address _client, address _arbiter, string memory _IPFSHash, string memory _repoURL, VerificationMode _mode) payable {
        if (msg.value == 0) revert InvalidContractEthValue();

        client = _client;
        arbiter = _arbiter;
        IPFSHash = _IPFSHash;
        repoURL = _repoURL;
        verificationMode = _mode;
        deployTime = block.timestamp; 
    }

    function applyAsFreelancer() external {
        if (state != EscrowState.OPEN && state != EscrowState.APPLIED) revert InvalidForContractState();
        applicants.push(msg.sender);
        state = EscrowState.APPLIED;
    }

    function hireFreelancer(address _dev) external onlyClient inState(EscrowState.APPLIED) {
        freelancer = _dev;
        state = EscrowState.LOCKED;
    }

    function submitWork() external onlyFreelancer inState(EscrowState.LOCKED) {
        state = EscrowState.IN_REVIEW;
        autoReleaseDeadline = block.timestamp + reviewWindow;

        emit JobSubmitted(msg.sender, block.timestamp, verificationMode);
    }

    function completeJob() external onlyClient inState(EscrowState.IN_REVIEW) {
        state = EscrowState.COMPLETED;
        payFreelancer();
    }

    function dispute() external onlyClient inState(EscrowState.IN_REVIEW) {
        state = EscrowState.DISPUTED;
        emit DisputeRaised(msg.sender, block.timestamp, verificationMode);
    }

    function autoRelease() external inState(EscrowState.IN_REVIEW) {
        if (block.timestamp < autoReleaseDeadline) revert InvalidForContractState();
        state = EscrowState.COMPLETED;
        payFreelancer();
    }

    function payFreelancer() public inState(EscrowState.COMPLETED) {
        (bool success, ) = payable(freelancer).call{ value: address(this).balance }("");
        if (!success) revert PaymentFailed();
    }

    function refundClient() external inState(EscrowState.CANCELLED) {
        (bool success, ) = payable(client).call{ value: address(this).balance }("");
        if (!success) revert PaymentFailed();
    }

    function chargeDisputeFeed() private inState(EscrowState.COMPLETED) {
        uint256 arbiterFee = (address(this).balance * disputePercent) / 1 ether;
        (bool success, ) = payable(arbiter).call{ value: arbiterFee }("");
        if (!success) revert PaymentFailed();
    }

    function resolveDispute(bool _payFreelancer) external onlyArbiter {
        state = _payFreelancer ? EscrowState.COMPLETED : EscrowState.CANCELLED;
        chargeDisputeFeed();
    }
}
