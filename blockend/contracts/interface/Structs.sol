// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


interface IClashOfBalls{
    
    struct Game{
        address homeFanToken; 
        address awayFanToken;
        string metadata;
    }

    struct EncryptedPredictionInput{
        address player;
        bytes[5] encryptedActionIds;
        bytes[2] encryptedPlayerIds;
        bytes[3] encryptedTeams;
        bytes[8] encryptedPredictionValues;
    }

    struct Challenge{
        EncryptedPredictionInput playerOne;
        EncryptedPredictionInput playerTwo;
        uint32 fixtureId;
        uint16 playerOnePoints;
        uint16 playerTwoPoints; 
        uint256 amount;    
        uint8 winner;
        bool challengeAccepted;
        bool isCompleted;
    }
    
    struct Action{
        uint8 basePoints;
        uint16 multiplierStepsInBps;
        string metadata;
    }

    struct DecryptedPrediction{
        address player;
        uint8[5] selectedActionIds;
        uint32[2] predictionKeyPlayers;
        bool[3] predictionKeyTeams;
        uint8[8] predictionValues;
    }

    struct DecryptedChallenge{
        uint32 fixtureId;
        DecryptedPrediction playerOne;
        DecryptedPrediction playerTwo;
    }
}