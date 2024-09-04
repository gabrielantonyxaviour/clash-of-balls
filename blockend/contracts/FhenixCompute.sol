

pragma solidity ^0.8.10;


import "@fhenixprotocol/contracts/FHE.sol";

contract FhenixCompute{

    struct Action{
        uint8 basePoints;
        uint16 multiplierInBps;
        string metadata;
    }

    struct PlayerPrediction{
        address player;
        euint16[2] predictionKeyPlayers;
        ebool[3] predictionKeyTeams;
        euint8[8] predictionValues;
    }

    struct Challenge{
        PlayerPrediction playerOne;
        PlayerPrediction playerTwo;
        uint32 fixtureId;
        uint8 playerOnePoints;
        uint8 playerTwoPoints;     
        bool winner;
        bool isCompleted;
    }

    address public owner;
    address public router;
    address public core;
    mapping(uint8 => Action) public actions;
    mapping(uint256 => Challenge) public challenges;

    uint256 public challengeId;

    constructor(address hyperlaneRouter, address _core, uint8[10] memory basePoints, uint16[10] memory multiplierInBps, string[10] memory metadata) {
        owner = msg.sender;
        router=hyperlaneRouter;
        core=_core;
        challengeId=0;
        setActions(basePoints, multiplierInBps, metadata);
    }

    event ActionsConfigured(uint8[10] basePoints, uint16[10] multiplierInBps, string[10] metadata);
    event ChallengeCreated(uint256 indexed challengeId, uint256 indexed fixtureId, address indexed playerOne);
    event ChallengeAccepted(uint256 indexed challengeId, address indexed playerTwo);
    event ChallengeCompleted(uint256 indexed challengeId, address indexed winner, uint8 playerOnePoints, uint8 playerTwoPoints);

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function setActions(uint8[10] memory basePoints, uint16[10] memory multiplierInBps, string[10] memory metadata) public onlyOwner {
        for(uint8 i=0; i<basePoints.length; i++) actions[i] = Action(basePoints[i], multiplierInBps[i], metadata[i]);
        emit ActionsConfigured(basePoints, multiplierInBps, metadata);

    }

    // Stake fan tokens in Chiliz and receive the encrypted predictions in Fhenix testnet.
    function createChallenge(uint256 _amount, uint256 _duration, uint256 _reward, string memory _description) public returns (uint256){
    }
    
    // Stake Fan tokens in Chiliz and receive the encrypted predictions in Fhenix testnet.
    function acceptChallenge(uint256 _challengeId) public returns (uint256){
    }

    // Receive cross chain message from Arbitrum and compute private data in Fhenix testnet and reveal the winners along with their predictions to Chiliz Spicy Testnet.
    function revealWinner(uint256 _challengeId, uint256 _winner) public returns (uint256){
    }

}