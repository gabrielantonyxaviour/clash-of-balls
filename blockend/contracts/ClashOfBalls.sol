// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interface/Structs.sol";
import "./interface/IMailbox.sol";

contract ClashOfBalls is IClashOfBalls{

    address public owner;
    mapping(uint32=>Game) public games;
    mapping(uint256=>Challenge) public challenges;

    bytes32 public fhenixCompute;
    uint32 public constant COMPUTE_DOMAIN = 8008135;

    IMailbox public mailbox;
    uint256 public challengeId;

    constructor(IMailbox _mailbox) {
        mailbox = _mailbox;
        owner = msg.sender;
    }

    event ChallengeCreated(uint256 challengeId, uint32 gameId, address challenger, uint256 amount);
    event ChallengeAccepted(uint256 challengeId, address challenger);
    event ChallengeCompleted(uint256 challengeId, address winner, uint256 amount, uint8 winnerIndex);
    event CrosschainMessageSent(bytes32 messageId, bytes encodedMessage);
    event CrosschainMessageReceived(uint256 challengeId, uint16 playerOnePoints, uint16 playerTwoPoints);
    event DiscountAvailed(uint256 challengeId, address player, address fanToken);

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyMailbox() {
        require(
            msg.sender == address(mailbox),
            "MailboxClient: sender not mailbox"
        );
        _;
    }

    modifier onlyAuthorizedSender(bytes32 _sender, uint32 origin) {
        require(COMPUTE_DOMAIN==origin, "MailboxClient: invalid origin");
        require(
            fhenixCompute == _sender , 
            "MailboxClient: unauthorized sender"
        );
        _;
    }

    function setFhenixCompute(address _fhenixCompute) public onlyOwner {
        fhenixCompute = addressToBytes32(_fhenixCompute);
    }

    function createGames(uint32[] memory fixtureIds, address[] memory home, address[] memory away, string[] memory metadata) public {
        for(uint i=0; i<fixtureIds.length; i++) games[fixtureIds[i]] = Game(home[i], away[i], metadata[i]);
    }

    function createChallenge(uint32 gameId, uint256 _amount, EncryptedPredictionInput memory _encryptedPredictions) external payable {
        require(msg.value >= _amount, "Invalid amount");
        Challenge storage challenge = challenges[challengeId];
        challenge.playerOne = _encryptedPredictions;
        challenge.fixtureId = gameId;
        challenge.amount = _amount;
        emit ChallengeCreated(challengeId, gameId, msg.sender, _amount);
        challengeId += 1;
    }
    
    function acceptChallenge(uint256 _challengeId, EncryptedPredictionInput memory _encryptedPredictions) external payable {
        Challenge storage challenge = challenges[_challengeId];
        require(msg.value >= challenge.amount, "Invalid amount");

        challenge.playerTwo = _encryptedPredictions;
        challenge.challengeAccepted = true;

        _fanTokenDiscount([challenge.playerOne.player, challenge.playerTwo.player], [games[challenge.fixtureId].homeFanToken, games[challenge.fixtureId].awayFanToken], challenge.amount);        
        
        bytes memory encodedMessage=abi.encode(challenge.fixtureId, [challenge.playerOne, challenge.playerTwo], block.timestamp); // NOTE: block.timestamp is used temporarily. NOT FOR Production.
        bytes32 messageId = mailbox.dispatch{value: 0}(COMPUTE_DOMAIN, fhenixCompute, encodedMessage);
        emit ChallengeAccepted(challengeId, msg.sender);
        emit CrosschainMessageSent(messageId, encodedMessage);
    }

    function _fanTokenDiscount(address[2] memory players, address[2] memory fanTokens, uint256 betAmount) internal{
        uint256 tokenOnePlayerOne = IERC20(fanTokens[0]).balanceOf(players[0]);
        uint256 tokenTwoPlayerOne = IERC20(fanTokens[1]).balanceOf(players[0]);
        uint256 tokenOnePlayerTwo = IERC20(fanTokens[0]).balanceOf(players[1]);
        uint256 tokenTwoPlayerTwo = IERC20(fanTokens[1]).balanceOf(players[1]);

        uint256 playerOneDiscount = 0;
        uint256 playerTwoDiscount = 0;

        if(tokenOnePlayerOne!=tokenOnePlayerTwo){
            if(tokenOnePlayerOne > tokenOnePlayerTwo){
                playerOneDiscount += betAmount * 5 / 100;
                emit DiscountAvailed(challengeId, players[0], fanTokens[0]);
            }else {
                playerTwoDiscount += betAmount * 5 / 100;
                emit DiscountAvailed(challengeId, players[1], fanTokens[0]);
            }
        }

        if(tokenTwoPlayerOne!=tokenTwoPlayerTwo){
            if(tokenTwoPlayerOne > tokenTwoPlayerTwo){
                 playerOneDiscount += betAmount * 5 / 100;
                emit DiscountAvailed(challengeId, players[0], fanTokens[1]);
            }else {
                playerTwoDiscount += betAmount * 5 / 100;
                emit DiscountAvailed(challengeId, players[1], fanTokens[1]);
            }
        }

        if(playerOneDiscount > 0) players[0].call{value: playerOneDiscount}("");
        if(playerTwoDiscount > 0) players[1].call{value: playerTwoDiscount}("");
        
    }

    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    function handle(uint32 _origin, bytes32 _sender, bytes calldata _data) external payable onlyMailbox onlyAuthorizedSender(_sender, _origin)  {
        (uint256 _challengeId, uint16 playerOnePoints, uint16 playerTwoPoints)=abi.decode(_data, (uint256, uint16, uint16));
        Challenge memory _challenge=challenges[_challengeId];

        uint256 reward = _challenge.amount * 3 / 2;
        if(playerOnePoints < playerTwoPoints){
            _challenge.playerTwo.player.call{value: reward}("");
            emit ChallengeCompleted(_challengeId, _challenge.playerTwo.player, reward, 1);
        }else if(playerOnePoints > playerTwoPoints){
            _challenge.playerOne.player.call{value: reward}("");
            emit ChallengeCompleted(_challengeId, _challenge.playerOne.player, reward, 0);
        }else{
            emit ChallengeCompleted(_challengeId, address(0), reward, 2);
        }

        emit CrosschainMessageReceived(_challengeId, playerOnePoints, playerTwoPoints);
    }

}