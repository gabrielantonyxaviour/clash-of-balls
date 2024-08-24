

pragma solidity ^0.8.10;


contract ChilizContract{

    // Stake fan tokens here and send the encrypted predictions to Fhenix testnet.
    function createChallenge(uint256 _amount, uint256 _duration, uint256 _reward, string memory _description) public returns (uint256){
    }
    
    // Stake Fan tokens in Chiliz and send the encrypted predictions to Fhenix testnet.
    function acceptChallenge(uint256 _challengeId) public returns (uint256){
    }

    // Receive cross chain transaction from Fhenix and send the prizes to winners in Spicy testnet.
    function reimbruseWinners(uint256 _challengeId, uint256 _winner) public returns (uint256){
    }

}