// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@fhenixprotocol/contracts/FHE.sol";
import "./interface/Structs.sol";

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
        uint8 winner;
        uint256 gameEnds;
        bool isCompleted;
    }

    address public owner;
    address public router;
    address public core;
    mapping(uint8 => Action) public actions;
    mapping(uint256 => ComputeChallenge) public challenges;
    mapping(uint256 => DecryptedChallenge) public decryptedChallenges;

    uint256 public challengeId;
    uint16 public constant BASE_MULTIPLIER = 100;

    constructor(address hyperlaneRouter, address _core, uint8[10] memory basePoints, uint16[10] memory multiplierStepsInBps, string[10] memory metadata) {
        owner = msg.sender;
        router=hyperlaneRouter;
        core=_core;
        challengeId=0;
        setActions(basePoints, multiplierStepsInBps, metadata);
    }

    event ActionsConfigured(uint8[10] basePoints, uint16[10] multiplierStepsInBps, string[10] metadata);
    event ChallengeCreated(uint256 indexed challengeId, uint256 indexed fixtureId, address indexed playerOne);
    event ChallengeAccepted(uint256 indexed challengeId, address indexed playerTwo);
    event ChallengeCompleted(uint256 indexed challengeId, address indexed winner, uint16 playerOnePoints, uint16 playerTwoPoints);
    event PredictionsDecrypted(uint256 indexed challengeId, DecryptedChallenge decryptedChallenge);

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function setActions(uint8[10] memory basePoints, uint16[10] memory multiplierStepsInBps, string[10] memory metadata) public onlyOwner {
        for(uint8 i=0; i<10; i++) actions[i] = Action(basePoints[i], multiplierStepsInBps[i], metadata[i]);
        emit ActionsConfigured(basePoints, multiplierStepsInBps, metadata);

    }


    // Receive cross chain transaction from Chiliz
    function createChallenge(uint32 fixtureId, address player, EncryptedPredictionInput[2] memory players, uint256 gameEndsIn) public {
        ComputeChallenge storage challenge = challenges[challengeId];
        PlayerPrediction memory playerOne;
        challenge.isCompleted = false;

        challenge.playerOne=formatEncryptedPredictions(players[0]);
        challenge.playerTwo=formatEncryptedPredictions(players[1]);

        challenge.gameEnds = block.timestamp + gameEndsIn;
        challenge.fixtureId = fixtureId;
        challenge.playerOne = playerOne;

        emit ChallengeCreated(challengeId, fixtureId, player);
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

        emit PredictionsDecrypted(_challengeId, decryptedChallenge);
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

    // Receive cross chain transaction from Arbitrum
    function revealWinner(uint256 _challengeId, uint128 results) public {
        DecryptedChallenge storage decryptedChallenge = decryptedChallenges[_challengeId];
        ComputeChallenge storage challenge = challenges[_challengeId];
        uint8[14] memory unpackedResults = [getTeamAHalfTimeGoal(results), getTeamBHalfTimeGoal(results), getTeamAFullTimeGoal(results), getTeamBFullTimeGoal(results), getTotalPenalties(results), getTotalCorners(results), getPlayerGoal(results, 0), getPlayerGoal(results, 1), getPlayerGoal(results, 2), getPlayerGoal(results, 3), getPlayerYellowCard(results, 0), getPlayerYellowCard(results, 1), getPlayerYellowCard(results, 2), getPlayerYellowCard(results, 3)];
        (uint16 playerOnePoints, uint16 playerTwoPoints)=resolvePoints(decryptedChallenge.playerOne, decryptedChallenge.playerTwo, unpackedResults);
        challenge.playerOnePoints = playerOnePoints;
        challenge.playerTwoPoints = playerTwoPoints;

        if(playerOnePoints < playerTwoPoints){
            challenge.winner = 1;
            emit ChallengeCompleted(_challengeId, challenge.playerTwo.player, playerOnePoints, playerTwoPoints);
        }else if(playerOnePoints > playerTwoPoints){
            challenge.winner = 0;
            emit ChallengeCompleted(_challengeId, challenge.playerOne.player, playerOnePoints, playerTwoPoints);
        }else{
            challenge.winner = 2;
            emit ChallengeCompleted(_challengeId, address(0), playerOnePoints, playerTwoPoints);
        }
        challenge.isCompleted=true;
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
                // Check if penalties count greater than or equal to predicted N penalties
                uint8 predictedScore = prediction.predictionValues[predictionValuesIndex++];
                uint8 totalPenalties = results[4];
                if(predictedScore <= totalPenalties) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * predictedScore));

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

    function getTotalPenalties(uint128 packedData) public pure returns (uint8) {
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

}