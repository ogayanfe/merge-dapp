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
struct Applicant {
    address applicant;
    uint256 timestamp;
}

struct EscrowVariableState {
    address client;
    address freelancer;
    address arbiter;
    string IPFSHash;
    string tags;
    uint256 deployTime;
    Applicant[] applicants;
    EscrowState state;
    string title;
    uint256 bounty;
    uint256 autoReleaseDeadline;
    VerificationMode verificationMode;
    bool applied;
    bool canApply;
    bool isClient;
    bool isArbiter;
}

contract GigEscrow {
    // ERRORS
    error NotAuthorised();
    error InvalidForContractState();
    error InvalidContractEthValue();
    error PaymentFailed();
    error AlreadyApplied();
    error InvalidTransactionSender();
    error InvalidPullRequestUrl();

    // EVENTS
    event ApplicationRecieved(address client, address applicant, uint256 timestamp);
    event JobSubmitted(address freelancer, uint256 timestamp, VerificationMode mode);
    event DisputeRaised(address client, uint256 timestamp, VerificationMode mode);

    // STATE VARIABLES
    address public client;
    address public freelancer;
    address public arbiter;
    string public IPFSHash;
    string public title;
    string public tags;
    uint256 public deployTime;
    Applicant[] public applicants;
    mapping(address => bool) public hasApplied;
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

    constructor(
        string memory _title,
        address _client,
        address _arbiter,
        string memory _IPFSHash,
        string memory _tags,
        VerificationMode _mode
    ) payable {
        if (msg.value == 0) revert InvalidContractEthValue();

        client = _client;
        arbiter = _arbiter;
        title = _title;
        IPFSHash = _IPFSHash;
        tags = _tags;
        verificationMode = _mode;
        deployTime = block.timestamp;
    }

    function applyForJob() external {
        if (state != EscrowState.OPEN && state != EscrowState.APPLIED) revert InvalidForContractState();
        if (hasApplied[msg.sender]) revert AlreadyApplied();
        if (msg.sender == client) revert InvalidTransactionSender();

        hasApplied[msg.sender] = true;
        applicants.push(Applicant({ applicant: msg.sender, timestamp: block.timestamp }));
        state = EscrowState.APPLIED;
    }

    function hireFreelancer(address _dev) external onlyClient inState(EscrowState.APPLIED) {
        freelancer = _dev;
        if (!hasApplied[_dev]) revert InvalidTransactionSender();
        state = EscrowState.LOCKED;
    }

    function verifyGithub(string calldata pullRequestUrl) internal inState(EscrowState.IN_REVIEW) {
        {
            // Here we add logic to verify using chain link
            pullRequestUrl;
        }
        state = EscrowState.COMPLETED;
    }

    function submitWork(string calldata pullRequestUrl) external onlyFreelancer inState(EscrowState.LOCKED) {
        state = EscrowState.IN_REVIEW;
        autoReleaseDeadline = block.timestamp + reviewWindow;

        if (verificationMode == VerificationMode.ManualValidation) {
            emit JobSubmitted(freelancer, block.timestamp, verificationMode);
            return;
        }

        if (bytes(pullRequestUrl).length == 0) {
            revert InvalidPullRequestUrl();
        }

        emit JobSubmitted(freelancer, block.timestamp, verificationMode);
        verifyGithub(pullRequestUrl);
    }

    function completeJob() external onlyClient inState(EscrowState.IN_REVIEW) {
        state = EscrowState.COMPLETED;
    }

    function dispute() external onlyClient inState(EscrowState.IN_REVIEW) {
        if (block.timestamp > autoReleaseDeadline) revert InvalidForContractState();
        state = EscrowState.DISPUTED;
        emit DisputeRaised(msg.sender, block.timestamp, verificationMode);
    }

    function cancelJob() external onlyClient {
        if (state != EscrowState.OPEN && state != EscrowState.APPLIED) revert InvalidForContractState();
        state = EscrowState.CANCELLED;
    }

    function autoRelease() external inState(EscrowState.IN_REVIEW) {
        if (block.timestamp <= autoReleaseDeadline) revert InvalidForContractState();
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

    function chargeDisputeFee() private {
        uint256 arbiterFee = (address(this).balance * disputePercent) / 1 ether;
        (bool success, ) = payable(arbiter).call{ value: arbiterFee }("");
        if (!success) revert PaymentFailed();
    }

    function resolveDispute(bool _payFreelancer) external onlyArbiter {
        state = _payFreelancer ? EscrowState.COMPLETED : EscrowState.CANCELLED;
        chargeDisputeFee();
    }

    function getEscrowVariableState() external view returns (EscrowVariableState memory) {
        return
            EscrowVariableState({
                client: client,
                freelancer: freelancer,
                arbiter: arbiter,
                IPFSHash: IPFSHash,
                tags: tags,
                deployTime: deployTime,
                applicants: applicants,
                state: state,
                title: title,
                bounty: address(this).balance,
                autoReleaseDeadline: autoReleaseDeadline,
                verificationMode: verificationMode,
                applied: hasApplied[msg.sender],
                canApply: (state == EscrowState.OPEN || state == EscrowState.APPLIED) &&
                    !hasApplied[msg.sender] &&
                    client != msg.sender &&
                    arbiter != msg.sender,
                isClient: client == msg.sender,
                isArbiter: arbiter == msg.sender
            });
    }
}
