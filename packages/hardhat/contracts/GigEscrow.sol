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
    uint256 deployBlock;
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
    string pullRequestUrl;
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
    event FreelancerHired(address client, address freelancer, uint256 timestamp);
    event JobSubmitted(address freelancer, uint256 timestamp, VerificationMode mode);
    event DisputeRaised(address client, uint256 timestamp, VerificationMode mode);
    event JobCompleted(address freelancer, uint256 timestamp, VerificationMode mode);
    event JobCancelled(address client, uint256 timestamp);
    event RepoVerified(string indexed pullRequestUrl, uint256 timestamp);
    event FreelancerPaid(address freelancer, uint256 amount, uint256 timestamp);
    event ClientRefunded(address client, uint256 amount, uint256 timestamp);
    event DisputeResolved(address arbiter, bool decision, uint256 timestamp, address winner);
    event DisputeFeeCharged(address arbiter, uint256 fee, uint256 timestamp, uint256 disputePercent);
    event JobCreated(
        uint256 indexed index,
        address indexed client,
        uint256 bounty,
        string title,
        string tags,
        VerificationMode verificationMode,
        address escrowAddress,
        uint256 postedTime,
        string IPFSHash
    );

    // STATE VARIABLES
    uint256 private bounty;

    address client;
    address freelancer;
    address arbiter;
    string IPFSHash;
    string title;
    string tags;
    uint256 public deployTime;
    uint256 public deployBlock;
    Applicant[] public applicants;
    mapping(address => bool) hasApplied;
    EscrowState state;
    uint256 autoReleaseDeadline;
    VerificationMode verificationMode;
    string pullRequestUrl;

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
        bounty = msg.value;
        IPFSHash = _IPFSHash;
        tags = _tags;
        verificationMode = _mode;
        deployTime = block.timestamp;
        deployBlock = block.number;
        emit JobCreated(0, _client, msg.value, _title, _tags, _mode, address(this), block.timestamp, _IPFSHash);
    }

    function applyForJob() external {
        if (state != EscrowState.OPEN && state != EscrowState.APPLIED) revert InvalidForContractState();
        if (hasApplied[msg.sender]) revert AlreadyApplied();
        if (msg.sender == client || msg.sender == arbiter) revert InvalidTransactionSender();

        hasApplied[msg.sender] = true;
        applicants.push(Applicant({ applicant: msg.sender, timestamp: block.timestamp }));
        state = EscrowState.APPLIED;
        emit ApplicationRecieved(client, msg.sender, block.timestamp);
    }

    function hireFreelancer(address _dev) external onlyClient inState(EscrowState.APPLIED) {
        freelancer = _dev;
        if (!hasApplied[_dev]) revert InvalidTransactionSender();
        state = EscrowState.LOCKED;
        emit FreelancerHired(client, freelancer, block.timestamp);
    }

    function submitWork(string calldata _pullRequestUrl) external onlyFreelancer inState(EscrowState.LOCKED) {
        state = EscrowState.IN_REVIEW;
        autoReleaseDeadline = block.timestamp + reviewWindow;
        pullRequestUrl = _pullRequestUrl;

        if (bytes(_pullRequestUrl).length == 0 && verificationMode == VerificationMode.RepoValidation) {
            revert InvalidPullRequestUrl();
        }

        emit JobSubmitted(freelancer, block.timestamp, verificationMode);
    }

    function completeJob() external onlyClient inState(EscrowState.IN_REVIEW) {
        state = EscrowState.COMPLETED;
        emit JobCompleted(freelancer, block.timestamp, verificationMode);
    }

    function dispute() external onlyClient inState(EscrowState.IN_REVIEW) {
        if (block.timestamp > autoReleaseDeadline) revert InvalidForContractState();
        state = EscrowState.DISPUTED;
        emit DisputeRaised(msg.sender, block.timestamp, verificationMode);
    }

    function cancelJob() external onlyClient {
        if (state != EscrowState.OPEN && state != EscrowState.APPLIED) revert InvalidForContractState();
        state = EscrowState.CANCELLED;
        emit JobCancelled(msg.sender, block.timestamp);
    }

    function autoRelease() external inState(EscrowState.IN_REVIEW) {
        if (block.timestamp <= autoReleaseDeadline) revert InvalidForContractState();
        state = EscrowState.COMPLETED;
        emit JobCompleted(freelancer, block.timestamp, verificationMode);
        payFreelancer();
    }

    function payFreelancer() public inState(EscrowState.COMPLETED) {
        uint256 paid = address(this).balance;
        (bool success, ) = payable(freelancer).call{ value: paid }("");
        if (!success) revert PaymentFailed();
        emit FreelancerPaid(freelancer, paid, block.timestamp);
    }

    function refundClient() external inState(EscrowState.CANCELLED) {
        uint256 paid = address(this).balance;
        (bool success, ) = payable(client).call{ value: paid }("");
        if (!success) revert PaymentFailed();
        emit ClientRefunded(client, paid, block.timestamp);
    }

    function chargeDisputeFee() private {
        uint256 arbiterFee = (address(this).balance * disputePercent) / 1 ether;
        (bool success, ) = payable(arbiter).call{ value: arbiterFee }("");
        if (!success) revert PaymentFailed();
        emit DisputeFeeCharged(arbiter, arbiterFee, block.timestamp, disputePercent);
    }

    function resolveDispute(bool _payFreelancer) external onlyArbiter {
        state = _payFreelancer ? EscrowState.COMPLETED : EscrowState.CANCELLED;
        chargeDisputeFee();
        emit DisputeResolved(arbiter, _payFreelancer, block.timestamp, _payFreelancer ? freelancer : client);
        if (_payFreelancer) {
            emit JobCompleted(freelancer, block.timestamp, verificationMode);
            return;
        }
        emit JobCancelled(client, block.timestamp);
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
                deployBlock: deployBlock,
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
                isArbiter: arbiter == msg.sender,
                pullRequestUrl: pullRequestUrl
            });
    }
}
