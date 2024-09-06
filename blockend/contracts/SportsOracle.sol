// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interface/IMailbox.sol";

error UnexpectedRequestID(bytes32 requestId);

contract SportsOracle is FunctionsClient, ConfirmedOwner{
    using FunctionsRequest for FunctionsRequest.Request;

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    event OracleError(bytes err);
    event Response(bytes32 indexed requestId, bytes response, bytes err);
    event CrosschainMessageReceived(uint32 fixtureId, uint32 playerOneGoalsId, uint32 playerTwoGoalsId, uint32 playerOneYellowCardsId, uint32 playerTwoYellowCardsId);
    event CrosschainMessageSent(bytes32 indexed _messageId, bytes _data);

    mapping(uint256 => string[5]) public challengeRequests;
    IMailbox public mailbox;

    bytes32 public fhenixCompute;

    uint32 public constant ORIGIN = 8008135;

    constructor(
        address router, IMailbox _mailbox
    ) FunctionsClient(router) ConfirmedOwner(msg.sender) {
        mailbox = _mailbox;
    }

    modifier onlyMailbox() {
        require(
            msg.sender == address(mailbox),
            "MailboxClient: sender not mailbox"
        );
        _;
    }

    modifier onlyAuthorizedSender(bytes32 _sender, uint32 origin) {
        require(origin==ORIGIN, "MailboxClient: invalid origin");
        require(
            fhenixCompute == _sender || true, // TODO: Remove this line in production
            "MailboxClient: unauthorized sender"
        );
        _;
    }

    function setFhenixCompute(address _fhenixComptue) public onlyOwner {
        fhenixCompute = addressToBytes32(_fhenixComptue);
    }

    function sendRequest(
        uint256 _challengeId,
        string memory source,
        bytes memory encryptedSecretsUrls,
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) external onlyOwner returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (encryptedSecretsUrls.length > 0)
            req.addSecretsReference(encryptedSecretsUrls);
        else if (donHostedSecretsVersion > 0) {
            req.addDONHostedSecrets(
                donHostedSecretsSlotID,
                donHostedSecretsVersion
            );
        }
        string[5] memory _args = challengeRequests[_challengeId];
        string[] memory args;
        for (uint256 i = 0; i < 5; i++) args[i] = _args[i];
        req.setArgs(args);
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );
        return s_lastRequestId;
    }

    function sendRequestCBOR(
        bytes memory request,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) external onlyOwner returns (bytes32 requestId) {
        s_lastRequestId = _sendRequest(
            request,
            subscriptionId,
            gasLimit,
            donID
        );
        return s_lastRequestId;
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId);
        }
        if(bytes(err).length>0){
            emit OracleError(err);
        }else{
            // uint128 decodedResponse=uint128(bytesToBytes16(response)); TODO: Use this code to decode in fhenix
            bytes32 messageId = mailbox.dispatch(ORIGIN, fhenixCompute, response);
            emit CrosschainMessageSent(messageId, response);
        }
    }

    // TODO: Use this code to decode in fhenix
    // function bytesToBytes16(bytes memory input) public pure returns (bytes16 output) {
    //     // Ensure the input length is 16 bytes
    //     require(input.length == 16, "Input length must be exactly 16 bytes");

    //     // Copy the first 16 bytes from input to output
    //     assembly {
    //         output := mload(add(input, 32))
    //     }
    // }

    function handle(uint32 _origin, bytes32 _sender, bytes calldata _data) external payable onlyMailbox onlyAuthorizedSender(_sender, _origin)  {
        (uint32 fixtureId, uint32 playerOneGoalsId, uint32 playerTwoGoalsId, uint32 playerOneYellowCardsId, uint32 playerTwoYellowCardsId) = abi.decode(_data, (uint32, uint32, uint32, uint32, uint32));
        
        challengeRequests[fixtureId] = [Strings.toString(uint256(fixtureId)), Strings.toString(uint256(playerOneGoalsId)), Strings.toString(uint256(playerTwoGoalsId)), Strings.toString(uint256(playerOneYellowCardsId)), Strings.toString(uint256(playerTwoYellowCardsId))];        

    }

    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

}