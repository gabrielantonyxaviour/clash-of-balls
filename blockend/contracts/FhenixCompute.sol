// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@fhenixprotocol/contracts/FHE.sol";
import "./interface/Structs.sol";
import "./interface/IMailbox.sol";

contract FhenixCompute is IClashOfBalls{
    struct PlayerPrediction{
        address player;
        euint8[5] selectedActionIds;
        euint32[2] predictionKeyPlayers;
        ebool[3] predictionKeyTeams;
        euint8[8] predictionValues;
    }

    struct ComputeChallenge{
        PlayerPrediction playerOne;
        PlayerPrediction playerTwo;
        uint32 fixtureId;
        uint16 playerOnePoints;
        uint16 playerTwoPoints;     
        uint256 gameEnds;
        bool isCompleted;
    }

    address public owner;
    IMailbox public mailbox;
    mapping(uint8 => Action) public actions;
    mapping(uint256 => ComputeChallenge) public challenges;
    mapping(uint256 => DecryptedChallenge) public decryptedChallenges;

    uint256 public challengeId;
    uint16 public constant BASE_MULTIPLIER = 100;

    bytes32 public oracle;
    bytes32 public core;

    uint32 public constant ORACLE_DOMAIN=421614;
    uint32 public constant CORE_DOMAIN=88882;

    constructor(IMailbox _mailbox, address _core, address _oracle, uint8[10] memory basePoints, uint16[10] memory multiplierStepsInBps, string[10] memory metadata) {
        owner = msg.sender;
        mailbox=_mailbox;
        core=addressToBytes32(_core);
        oracle=addressToBytes32(_oracle);
        challengeId=0;
        setActions(basePoints, multiplierStepsInBps, metadata);
    }

    event ActionsConfigured(uint8[10] basePoints, uint16[10] multiplierStepsInBps, string[10] metadata);
    event ChallengeCreated(uint256 indexed challengeId, uint256 indexed fixtureId, address[2] players);
    event ChallengeAccepted(uint256 indexed challengeId, address indexed playerTwo);
    event ChallengeCompleted(uint256 indexed challengeId, uint16 playerOnePoints, uint16 playerTwoPoints);
    event PredictionsDecrypted(uint256 indexed challengeId, DecryptedChallenge decryptedChallenge);

    event CrosschainMessageSent(bytes32 indexed _messageId, bytes _data);
    event CrosschainMessageReceived(uint32 indexed _origin, bytes32 indexed _sender, bytes data);
  
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
        require(
            (origin==ORACLE_DOMAIN && _sender==oracle)|| (origin==CORE_DOMAIN && _sender==core),
            "MailboxClient: unauthorized sender"
        );
        _;
    }

    function setActions(uint8[10] memory basePoints, uint16[10] memory multiplierStepsInBps, string[10] memory metadata) public onlyOwner {
        for(uint8 i=0; i<10; i++) actions[i] = Action(basePoints[i], multiplierStepsInBps[i], metadata[i]);
        emit ActionsConfigured(basePoints, multiplierStepsInBps, metadata);

    }

    // Receive cross chain transaction from Chiliz
    function createChallenge(uint32 fixtureId, EncryptedPredictionInput[2] memory players, uint256 gameEndsIn) public {
        ComputeChallenge storage challenge = challenges[challengeId];
        PlayerPrediction memory playerOne;
        challenge.isCompleted = false;

        challenge.playerOne=formatEncryptedPredictions(players[0]);
        challenge.playerTwo=formatEncryptedPredictions(players[1]);

        challenge.gameEnds = block.timestamp + gameEndsIn;
        challenge.fixtureId = fixtureId;
        
        emit ChallengeCreated(challengeId, fixtureId, [players[0].player, players[1].player]);
        challengeId += 1;
    }

    // Internal
    function formatEncryptedPredictions(EncryptedPredictionInput memory encryptedPrediction) public pure returns (PlayerPrediction memory prediction){
        prediction.player = encryptedPrediction.player;
        for(uint8 i=0; i<5; i++) prediction.selectedActionIds[i] = FHE.asEuint8(encryptedPrediction.encryptedActionIds[i]);
        for(uint8 i=0; i<2; i++) prediction.predictionKeyPlayers[i] = FHE.asEuint32(encryptedPrediction.encryptedPlayerIds[i]);
        for(uint8 i=0; i<3; i++) prediction.predictionKeyTeams[i] = FHE.asEbool(encryptedPrediction.encryptedTeams[i]);
        for(uint8 i=0; i<8; i++) prediction.predictionValues[i] = FHE.asEuint8(encryptedPrediction.encryptedPredictionValues[i]);
    }
    
    // Send cross chain tx to Arbitrum
    function triggerResults(uint256 _challengeId) public {
        DecryptedChallenge storage decryptedChallenge = decryptedChallenges[_challengeId];
        decryptedChallenge.fixtureId = challenges[_challengeId].fixtureId;
        
        (DecryptedPrediction memory playerOne, DecryptedPrediction memory playerTwo) = resolvePredictions(challenges[_challengeId].playerOne, challenges[_challengeId].playerTwo);
        decryptedChallenge.playerOne = playerOne;
        decryptedChallenge.playerTwo = playerTwo;
        // Send cross chain tx to Arbitrum
        bytes memory encodedMessage = abi.encode(_challengeId, decryptedChallenge.fixtureId, decryptedChallenge.playerOne.predictionKeyPlayers[0], decryptedChallenge.playerTwo.predictionKeyPlayers[0], decryptedChallenge.playerOne.predictionKeyPlayers[1], decryptedChallenge.playerTwo.predictionKeyPlayers[1]);
        bytes32 _messageId=mailbox.dispatch(ORACLE_DOMAIN, oracle, encodedMessage);
        emit PredictionsDecrypted(_challengeId, decryptedChallenge);
        emit CrosschainMessageSent(_messageId, encodedMessage);
    }

    // Internal
    function resolvePredictions(PlayerPrediction memory predictionOne, PlayerPrediction memory predictionTwo) public pure returns (DecryptedPrediction memory playerOne, DecryptedPrediction memory playerTwo){
        playerOne = decryptPrediction(predictionOne);
        playerTwo = decryptPrediction(predictionTwo);
    }


    // Internal
    function decryptPrediction(PlayerPrediction memory prediction) public pure returns (DecryptedPrediction memory decryptedPrediction){
        decryptedPrediction.player = prediction.player;
        decryptedPrediction.selectedActionIds = [FHE.decrypt(prediction.selectedActionIds[0]), FHE.decrypt(prediction.selectedActionIds[1]), FHE.decrypt(prediction.selectedActionIds[2]), FHE.decrypt(prediction.selectedActionIds[3]), FHE.decrypt(prediction.selectedActionIds[4])];
        decryptedPrediction.predictionKeyPlayers = [FHE.decrypt(prediction.predictionKeyPlayers[0]), FHE.decrypt(prediction.predictionKeyPlayers[1])];
        decryptedPrediction.predictionKeyTeams = [FHE.decrypt(prediction.predictionKeyTeams[0]), FHE.decrypt(prediction.predictionKeyTeams[1]), FHE.decrypt(prediction.predictionKeyTeams[2])];
        decryptedPrediction.predictionValues = [FHE.decrypt(prediction.predictionValues[0]), FHE.decrypt(prediction.predictionValues[1]), FHE.decrypt(prediction.predictionValues[2]), FHE.decrypt(prediction.predictionValues[3]), FHE.decrypt(prediction.predictionValues[4]), FHE.decrypt(prediction.predictionValues[5]), FHE.decrypt(prediction.predictionValues[6]), FHE.decrypt(prediction.predictionValues[7])];
    }

    function revealWinner(uint256 _challengeId, uint128 results) public {

        DecryptedChallenge storage decryptedChallenge = decryptedChallenges[_challengeId];
        ComputeChallenge storage challenge = challenges[_challengeId];
        uint8[14] memory unpackedResults = [getTeamAHalfTimeGoal(results), getTeamBHalfTimeGoal(results), getTeamAFullTimeGoal(results), getTeamBFullTimeGoal(results), getTotalShotsOnGoal(results), getTotalCorners(results), getPlayerGoal(results, 0), getPlayerGoal(results, 1), getPlayerGoal(results, 2), getPlayerGoal(results, 3), getPlayerYellowCard(results, 0), getPlayerYellowCard(results, 1), getPlayerYellowCard(results, 2), getPlayerYellowCard(results, 3)];
        (uint16 playerOnePoints, uint16 playerTwoPoints)=resolvePoints(decryptedChallenge.playerOne, decryptedChallenge.playerTwo, unpackedResults);
        challenge.playerOnePoints = playerOnePoints;
        challenge.playerTwoPoints = playerTwoPoints;
        challenge.isCompleted=true;
        bytes memory encodedMessage=abi.encode(_challengeId, playerOnePoints, playerTwoPoints);
        bytes32 _messageId = mailbox.dispatch(CORE_DOMAIN, core, encodedMessage);

        emit CrosschainMessageSent(_messageId, encodedMessage);
        emit ChallengeCompleted(_challengeId, playerOnePoints, playerTwoPoints);
    }

    // Internal
    function resolvePoints(DecryptedPrediction memory predictionOne, DecryptedPrediction memory predictionTwo, uint8[14] memory results) public view returns (uint16 playerOnePoints, uint16 playerTwoPoints){
        playerOnePoints = calculatePoints(predictionOne, results, true);
        playerTwoPoints = calculatePoints(predictionTwo, results, false);
    }

    // Internal
    function calculatePoints(DecryptedPrediction memory prediction, uint8[14] memory results, bool isPlayerOne) public view returns (uint16 points){
        uint8 predictionValuesIndex = 0;
        uint8 predictionKeyPlayersIndex = 0;
        uint8 predictionKeyTeamsIndex = 0;

        for(uint8 i=0; i<5; i++){
            uint8 actionId = prediction.selectedActionIds[i];
            Action memory action = actions[actionId];
            if(actionId == 0){ 
                // Check if the game is a draw
                if(results[2] == results[3]) points += action.basePoints * BASE_MULTIPLIER;
            }
            else if(actionId == 1){
                // Check if both teams scored
                if(results[2] > 0  && results[3] > 0) points += action.basePoints * BASE_MULTIPLIER;
            } 
            else if(actionId == 2){
                // Check if total goals greater than or equal to predicted N goals
                uint8 predictedScore = prediction.predictionValues[predictionValuesIndex++];
                uint8 totalGoals = results[2] + results[3];
                if(predictedScore <= totalGoals) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * predictedScore));
            } else if(actionId == 3){
                // Check if total shots on goal count greater than or equal to predicted N shots on goal
                uint8 predictedScore = prediction.predictionValues[predictionValuesIndex++];
                uint8 totalShotsOnGoal = results[4];
                if(predictedScore <= totalShotsOnGoal) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * predictedScore));

            } else if(actionId == 4){
                // Check if corners count greater than or equal to predicted N corners
                uint8 predictedScore = prediction.predictionValues[predictionValuesIndex++];
                uint8 totalCorners = results[5];
                if(predictedScore <= totalCorners) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * predictedScore));
            } else if(actionId == 5){
                // Check if Team A/B wins by N goals or more
                uint8 predictedScore = prediction.predictionValues[predictionValuesIndex++];
                bool predictedTeam = prediction.predictionKeyTeams[predictionKeyTeamsIndex++];
                uint8 teamAGoals = results[2];
                uint8 teamBGoals = results[3];
                if(!predictedTeam && teamAGoals > teamBGoals){
                    if(predictedScore <= teamAGoals - teamBGoals) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * predictedScore));
                } else if(teamBGoals > teamAGoals) {
                    if(predictedScore <= teamBGoals - teamAGoals) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * predictedScore));
                }
            } else if(actionId == 6){
                // Check if Team A/B scores N goals or more in the first half
                uint8 predictedScore = prediction.predictionValues[predictionValuesIndex++];
                bool predictedTeam = prediction.predictionKeyTeams[predictionKeyTeamsIndex++];
                if(!predictedTeam){
                    uint8 teamAGoals = results[0];
                    if(predictedScore <= teamAGoals) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * predictedScore));
                } else {
                    uint8 teamBGoals = results[1];
                    if(predictedScore <= teamBGoals) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * predictedScore));
                }
            } else if(actionId == 7){
                // Check if Team A/B scores N goals or more in the game
                uint8 predictedScore = prediction.predictionValues[predictionValuesIndex++];
                bool predictedTeam = prediction.predictionKeyTeams[predictionKeyTeamsIndex++];
                if(!predictedTeam){
                    uint8 teamAGoals = results[2];
                    if(predictedScore <= teamAGoals) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * predictedScore));
                } else {
                    uint8 teamBGoals = results[3];
                    if(predictedScore <= teamBGoals) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * predictedScore));
                }
            } else if(actionId == 8){
                // Check if player scores N goals or more
                uint8 predictedScore = prediction.predictionValues[predictionValuesIndex++];
                uint8 playerGoals = results[6 + (isPlayerOne ? 0 : 2) + predictionKeyPlayersIndex++];
                if(predictedScore <= playerGoals) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * predictedScore));
                
            } else if(actionId == 9){
                // Check if player gets N yellow cards or more
                uint8 predictedScore = prediction.predictionValues[predictionValuesIndex++];
                uint8 playerYellowCards = results[10 + (isPlayerOne ? 0 : 2) + predictionKeyPlayersIndex++];
                if(predictedScore <= playerYellowCards) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * predictedScore));
            }
        }
    }

    function getTeamAHalfTimeGoal(uint128 packedData) public pure returns (uint8) {
        return uint8((packedData >> 120) & 0xFF);
    }

    function getTeamBHalfTimeGoal(uint128 packedData) public pure returns (uint8) {
        return uint8((packedData >> 112) & 0xFF);
    }

    function getTeamAFullTimeGoal(uint128 packedData) public pure returns (uint8) {
        return uint8((packedData >> 104) & 0xFF);
    }

    function getTeamBFullTimeGoal(uint128 packedData) public pure returns (uint8) {
        return uint8((packedData >> 96) & 0xFF);
    }

    function getTotalShotsOnGoal(uint128 packedData) public pure returns (uint8) {
        return uint8((packedData >> 88) & 0xFF);
    }

    function getTotalCorners(uint128 packedData) public pure returns (uint8) {
        return uint8((packedData >> 80) & 0xFF);
    }

    function getPlayerGoal(uint128 packedData, uint8 index) public pure returns (uint8) {
        require(index < 4, "Index out of bounds");
        return uint8((packedData >> (72 - index * 8)) & 0xFF);
    }

    function getPlayerYellowCard(uint128 packedData, uint8 index) public pure returns (uint8) {
        require(index < 4, "Index out of bounds");
        return uint8((packedData >> (40 - index * 8)) & 0xFF);
    }

    function testSendCrosschain(uint256 challengeId, uint32[5] memory _data) public {
        bytes memory data = abi.encode(challengeId, _data[0], _data[1], _data[2], _data[3], _data[4]);
        bytes32 messageId = mailbox.dispatch{value: 0}(ORACLE_DOMAIN, oracle, data);
        emit CrosschainMessageSent(messageId, data);
    }

    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    function handle(uint32 _origin, bytes32 _sender, bytes calldata _data) external payable onlyMailbox onlyAuthorizedSender(_sender, _origin)  {
        if(_origin==ORACLE_DOMAIN){
            (uint256 _challengeId, uint128 results)=abi.decode(_data, (uint256, uint128));
            revealWinner(_challengeId, results);
        }else{
            (uint256 _challengeId, EncryptedPredictionInput[2] memory _encryptedChallenges, uint256 endsIn)=abi.decode(_data, (uint256, EncryptedPredictionInput[2], uint256));
            createChallenge(challenges[_challengeId].fixtureId, _encryptedChallenges, 0); // NOTE: gameEndsIn is set to zero for testing. NOT IN PRODUCTION.
        }
        emit CrosschainMessageReceived(_origin, _sender, _data);
    }

}