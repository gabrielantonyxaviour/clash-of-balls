

pragma solidity ^0.8.10;


import "@fhenixprotocol/contracts/FHE.sol";

contract FhenixCompute{

    struct Action{
        uint8 actionId;
        uint8 basePoints;
        uint16 multiplierInBps;
    }

    struct PlayerPrediction{
        address player;
        
    }

    struct Challenge{
        bytes32 challengeId;
        uint32 fixtureId;
        PlayerPrediction playerOne;
        PlayerPrediction playerTwo;
        bool isCompleted;
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