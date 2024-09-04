

pragma solidity ^0.8.10;


import "@fhenixprotocol/contracts/FHE.sol";

contract FhenixCompute{

    struct Action{
        uint8 basePoints;
        uint16 multiplierStepsInBps;
        string metadata;
    }

    struct PlayerPrediction{
        address player;
        euint8[5] selectedActionIds;
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
        uint8 winner;
        bool isCompleted;
    }

    address public owner;
    address public router;
    address public core;
    mapping(euint8 => Action) public actions;
    mapping(uint256 => Challenge) public challenges;

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

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function setActions(uint8[10] memory basePoints, uint16[10] memory multiplierStepsInBps, string[10] memory metadata) public onlyOwner {
        for(euint8 i=0; i<FHE.asEuint8(10); FHE.add(i,FHE.asEuint8(1))) actions[i] = Action(basePoints[i], multiplierStepsInBps[i], metadata[i]);
        emit ActionsConfigured(basePoints, multiplierStepsInBps, metadata);

    }

    function createChallenge(uint32 fixtureId, address player, bytes[5] memory selectedActionIds, bytes[2] memory predictionKeyPlayers, bytes[3] memory predictionKeyTeams, bytes[8] memory predictionValues) public returns (uint256){
        // Convert to encrypted types
        PlayerPrediction memory playerOne = PlayerPrediction(player, selectedActionIds, predictionKeyPlayers, predictionKeyTeams, predictionValues);
        challenges[challengeId] = Challenge(playerOne, PlayerPrediction(), fixtureId, 0, 0, 0, false);
        emit ChallengeCreated(challengeId, fixtureId, player);
        challengeId += 1;
    }
    
    function acceptChallenge(uint256 _challengeId, address player, bytes[5] memory selectedActionIds, bytes[2] memory predictionKeyPlayers, bytes[3] memory predictionKeyTeams, bytes[8] memory predictionValues) public returns (uint256){
        // Convert to encrypted types
        PlayerPrediction memory playerTwo = PlayerPrediction(player, selectedActionIds, predictionKeyPlayers, predictionKeyTeams, predictionValues);
        challenges[_challengeId].playerTwo = playerTwo;
        emit ChallengeAccepted(_challengeId, player);
    }

    function revealWinner(uint256 _challengeId, uint128 results) public returns (uint256){
        Challenge storage challenge = challenges[_challengeId];
        uint8[14] memory unpackedResults = [getTeamAHalfTimeGoal(results), getTeamBHalfTimeGoal(results), getTeamAFullTimeGoal(results), getTeamBFullTimeGoal(results), getTotalPenalties(results), getTotalCorners(results), getPlayerGoal(results, 0), getPlayerGoal(results, 1), getPlayerGoal(results, 2), getPlayerGoal(results, 3), getPlayerYellowCard(results, 0), getPlayerYellowCard(results, 1), getPlayerYellowCard(results, 2), getPlayerYellowCard(results, 3)];
        (uint16 playerOnePoints, uint16 playerTwoPoints)=resolvePoints(challenge.playerOne, challenge.playerTwo, unpackedResults);

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

    function resolvePoints(PlayerPrediction memory predictionOne, PlayerPrediction memory predictionTwo, uint8[14] memory results) public view returns (uint16 playerOnePoints, uint16 playerTwoPoints){
        playerOnePoints = calculatePoints(predictionOne, results, true);
        playerTwoPoints = calculatePoints(predictionTwo, results, false);
    }

    function calculatePoints(PlayerPrediction memory prediction, uint8[14] memory results, bool isPlayerOne) public view returns (uint16 points){
        euint8 predictionKeyPlayersIndex = FHE.asEuint8(0);
        euint8 predictionKeyTeamsIndex = FHE.asEuint8(0);
        euint8 predictionValuesIndex = FHE.asEuint8(0);

        for(uint8 i=0; i<5; i++){
            euint8 actionId = prediction.selectedActionIds[i];
            Action memory action = actions[actionId];
            if(FHE.eq(actionId, FHE.asEuint8(0))){
                // Check if the game is a draw
                if(results[2] == results[3]) points += action.basePoints * BASE_MULTIPLIER;
                FHE.add(predictionValuesIndex, FHE.asEuint8(0));
                FHE.add(predictionKeyPlayersIndex, FHE.asEuint8(0)); 
                FHE.add(predictionKeyTeamsIndex, FHE.asEuint8(0));
            }
            else if(FHE.eq(actionId, FHE.asEuint8(1)) && ){
                // Check if both teams scored
                if(results[2] > 0  && results[3] > 0) points += action.basePoints * BASE_MULTIPLIER;

                FHE.add(predictionValuesIndex, FHE.asEuint8(0));
                FHE.add(predictionKeyPlayersIndex, FHE.asEuint8(0)); 
                FHE.add(predictionKeyTeamsIndex, FHE.asEuint8(0));
            } 
            else if(FHE.eq(actionId, FHE.asEuint8(2))){
                // Check if total goals greater than or equal to predicted N goals
                euint8 predictedScore = predictionValues[predictionValuesIndex];
                euint8 totalGoals = FHE.asEuint8(results[2] + results[3])
                if(FHE.leq(predictedScore, totalGoals)) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * FHE.decrypt(predictedScore)));
                
                FHE.add(predictionValuesIndex, FHE.asEuint8(1));
                FHE.add(predictionKeyPlayersIndex, FHE.asEuint8(0)); 
                FHE.add(predictionKeyTeamsIndex, FHE.asEuint8(0));
            } else if(FHE.eq(actionId, FHE.asEuint8(3))){
                // Check if penalties count greater than or equal to predicted N penalties
                euint8 predictedScore = predictionValues[predictionValuesIndex];
                euint8 totalPenalties = FHE.asEuint8(results[4]);
                if(FHE.leq(predictedScore, totalPenalties)) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * FHE.decrypt(predictedScore)));
                
                FHE.add(predictionValuesIndex, FHE.asEuint8(1));
                FHE.add(predictionKeyPlayersIndex, FHE.asEuint8(0)); 
                FHE.add(predictionKeyTeamsIndex, FHE.asEuint8(0));
            } else if(FHE.eq(actionId, FHE.asEuint8(4))){
                // Check if corners count greater than or equal to predicted N corners
                euint8 predictedScore = predictionValues[predictionValuesIndex];
                euint8 totalCorners = FHE.asEuint8(results[5]);
                if(FHE.leq(predictedScore, totalCorners)) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * FHE.decrypt(predictedScore)));
                
                FHE.add(predictionValuesIndex, FHE.asEuint8(1));
                FHE.add(predictionKeyPlayersIndex, FHE.asEuint8(0)); 
                FHE.add(predictionKeyTeamsIndex, FHE.asEuint8(0));
            } else if(FHE.eq(actionId, FHE.asEuint8(5))){
                // Check if Team A/B wins by N goals or more
                euint8 predictedScore = predictionValues[predictionValuesIndex];
                ebool predictedTeam = predictionKeyTeams[predictionKeyTeamsIndex];
                euint8 teamAGoals = FHE.asEuint8(results[2]);
                euint8 teamBGoals = FHE.asEuint8(results[3]);
                if(FHE.eq(predictedTeam, FHE.asEbool(false)) && FHE.gt(teamAGoals, teamBGoals)){
                    if(FHE.leq(predictedScore, FHE.sub(teamAGoals, teamBGoals))) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * FHE.decrypt(predictedScore)));
                } else if(FHE.gt(teamBGoals, teamAGoals)) {
                    if(FHE.leq(predictedScore, FHE.sub(teamBGoals, teamAGoals))) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * FHE.decrypt(predictedScore)));
                }

                FHE.add(predictionValuesIndex, FHE.asEuint8(1));
                FHE.add(predictionKeyPlayersIndex, FHE.asEuint8(0)); 
                FHE.add(predictionKeyTeamsIndex, FHE.asEuint8(1));
            } else if(FHE.eq(actionId, FHE.asEuint8(6))){
                // Check if Team A/B scores N goals or more in the first half
                euint8 predictedScore = predictionValues[predictionValuesIndex];
                ebool predictedTeam = predictionKeyTeams[predictionKeyTeamsIndex];
                if(FHE.eq(predictedTeam, FHE.asEbool(false))){
                    euint8 teamAGoals = FHE.asEuint8(results[0]);
                    if(FHE.leq(predictedScore, teamAGoals)) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * FHE.decrypt(predictedScore)));
                } else {
                    euint8 teamBGoals = FHE.asEuint8(results[1]);
                    if(FHE.leq(predictedScore, teamBGoals)) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * FHE.decrypt(predictedScore)));
                }
                FHE.add(predictionValuesIndex, FHE.asEuint8(1));
                FHE.add(predictionKeyPlayersIndex, FHE.asEuint8(0)); 
                FHE.add(predictionKeyTeamsIndex, FHE.asEuint8(1));
            } else if(FHE.eq(actionId, FHE.asEuint8(7))){
                // Check if Team A/B scores N goals or more in the game
                euint8 predictedScore = predictionValues[predictionValuesIndex];
                ebool predictedTeam = predictionKeyTeams[predictionKeyTeamsIndex];
                if(FHE.eq(predictedTeam, FHE.asEbool(false))){
                    euint8 teamAGoals = FHE.asEuint8(results[2]);
                    if(FHE.leq(predictedScore, teamAGoals)) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * FHE.decrypt(predictedScore)));
                } else {
                    euint8 teamBGoals = FHE.asEuint8(results[3]);
                    if(FHE.leq(predictedScore, teamBGoals)) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * FHE.decrypt(predictedScore)));
                }
                FHE.add(predictionValuesIndex, FHE.asEuint8(1));
                FHE.add(predictionKeyPlayersIndex, FHE.asEuint8(0)); 
                FHE.add(predictionKeyTeamsIndex, FHE.asEuint8(1));
            } else if(FHE.eq(actionId, FHE.asEuint8(8))){
                // Check if player scores N goals or more
                euint8 predictedScore = predictionValues[predictionValuesIndex];
                euint8 playerGoals = FHE.asUint8(results[6 + (isPlayerOne ? 0 : 2) + FHE.decrypt(predictionKeyPlayersIndex)]);
                if(FHE.leq(predictedScore, playerGoals)) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * FHE.decrypt(predictedScore)));
                
                FHE.add(predictionValuesIndex, FHE.asEuint8(1));
                FHE.add(predictionKeyPlayersIndex, FHE.asEuint8(1)); 
                FHE.add(predictionKeyTeamsIndex, FHE.asEuint8(0));
            } else if(FHE.eq(actionId, FHE.asEuint8(9))){
                // Check if player gets N yellow cards or more
                euint8 predictedScore = predictionValues[predictionValuesIndex];
                euint8 playerYellowCards = FHE.asUint8(results[10 + (isPlayerOne ? 0 : 2) + FHE.decrypt(predictionKeyPlayersIndex)]);
                if(FHE.leq(predictedScore, playerYellowCards)) points += action.basePoints * (BASE_MULTIPLIER + (action.multiplierStepsInBps * FHE.decrypt(predictedScore)));

                FHE.add(predictionValuesIndex, FHE.asEuint8(1));
                FHE.add(predictionKeyPlayersIndex, FHE.asEuint8(1));
                FHE.add(predictionKeyTeamsIndex, FHE.asEuint8(0));
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