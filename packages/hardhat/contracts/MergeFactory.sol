//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import "@openzeppelin/contracts/access/Ownable.sol";
import { GigEscrow, VerificationMode } from "./GigEscrow.sol";

struct JobMetadata {
    uint256 index;
    address client;
    uint256 bounty;
    string title;
    address escrowAddress;
    uint256 postedTime;
    string IPFSHash;
}

contract MergeFactory is Ownable {
    // ERROR
    error InvalidAmount();

    // STATE VARIABLES
    address arbiter;
    JobMetadata[] public jobs;
    mapping(address => JobMetadata[]) public userJobs;

    // EVENTS
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

    constructor(address _owner, address _arbiter) Ownable(_owner) {
        arbiter = _arbiter;
    }

    function postJob(string calldata _title, string memory _IPFSHash, string memory tags, VerificationMode _verificationMode) external payable {
        if (msg.value == 0) revert InvalidAmount();
        GigEscrow newEscrow = new GigEscrow{ value: msg.value }(_title, msg.sender, arbiter, _IPFSHash, tags, _verificationMode);

        JobMetadata memory newJob = JobMetadata({
            bounty: msg.value,
            title: _title,
            index: jobs.length,
            client: msg.sender,
            escrowAddress: address(newEscrow),
            IPFSHash: _IPFSHash,
            postedTime: newEscrow.deployTime()
        });

        emit JobCreated(
            newJob.index,
            newJob.client,
            newJob.bounty,
            newJob.title,
            tags,
            _verificationMode,
            newJob.escrowAddress,
            newJob.postedTime,
            newJob.IPFSHash
        );

        jobs.push(newJob);
        userJobs[msg.sender].push(newJob);
    }

    function getJobsByClient(address _client) external view returns (JobMetadata[] memory) {
        return userJobs[_client];
    }

    function getJobs() external view returns (JobMetadata[] memory) {
        return jobs;
    }
}
