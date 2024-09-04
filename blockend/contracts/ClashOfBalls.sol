// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interface/Structs.sol";

contract ClashOfBalls is IClashOfBalls{

    address public owner;
    mapping(uint32=>Game) public games;
    mapping(uint256=>Challenge) public challenges;
    constructor() {
        owner = msg.sender;
    }

    uint256 public challengeId;

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function createGames(uint32[] memory fixtureIds, address[] memory home, address[] memory away, string[] memory metadata) public {
        for(uint i=0; i<fixtureIds.length; i++) games[fixtureIds[i]] = Game(home[i], away[i], metadata[i]);
    }

    // Stake amount here and wait for someone to accept challenge
    function createChallenge(uint32 gameId, uint256 _amount, EncryptedPredictionInput memory _encryptedPredictions) external payable {
        require(msg.value >= _amount, "Invalid amount");
        Challenge storage challenge = challenges[challengeId++];
        challenge.playerOne = _encryptedPredictions;
        challenge.fixtureId = gameId;
        challenge.amount = _amount;
    }
    
    // Stake Chiliz and send the encrypted predictions to Fhenix testnet.
    function acceptChallenge(uint256 _challengeId, EncryptedPredictionInput memory _encryptedPredictions) external payable {
        Challenge storage challenge = challenges[_challengeId];
        require(msg.value >= challenge.amount, "Invalid amount");

        challenge.playerTwo = _encryptedPredictions;
        challenge.challengeAccepted = true;

        _fanTokenDiscount([challenge.playerOne.player, challenge.playerTwo.player], [games[challenge.fixtureId].homeFanToken, games[challenge.fixtureId].awayFanToken], challenge.amount);        
        // Send cross chain tx to Fhenix testnet
    }

    function _fanTokenDiscount(address[2] memory players, address[2] memory fanTokens, uint256 betAmount) internal{
        uint256 tokenOnePlayerOne = IERC20(fanTokens[0]).balanceOf(players[0]);
        uint256 tokenTwoPlayerOne = IERC20(fanTokens[1]).balanceOf(players[0]);
        uint256 tokenOnePlayerTwo = IERC20(fanTokens[0]).balanceOf(players[1]);
        uint256 tokenTwoPlayerTwo = IERC20(fanTokens[1]).balanceOf(players[1]);

        uint256 playerOneDiscount = 0;
        uint256 playerTwoDiscount = 0;

        if(tokenOnePlayerOne > 0){
            if(tokenOnePlayerOne > tokenOnePlayerTwo){
                playerOneDiscount += betAmount * 5 / 100;
            }else if(tokenOnePlayerOne < tokenOnePlayerTwo){
                playerTwoDiscount += betAmount * 5 / 100;
            }
        }else if(tokenOnePlayerTwo > 0){
            playerTwoDiscount += betAmount * 5 / 100;
        }

        if(tokenTwoPlayerOne > 0){
            if(tokenTwoPlayerOne > tokenTwoPlayerTwo){
                playerOneDiscount += betAmount * 5 / 100;
            }else if(tokenTwoPlayerOne < tokenTwoPlayerTwo){
                playerTwoDiscount += betAmount * 5 / 100;
            }
        }else if(tokenTwoPlayerTwo > 0){
            playerTwoDiscount += betAmount * 5 / 100;
        }

        if(playerOneDiscount > 0) players[0].call{value: playerOneDiscount}("");
        if(playerTwoDiscount > 0) players[1].call{value: playerTwoDiscount}("");
        
    }

    // Receive cross chain transaction from Fhenix and send the prizes to winners in Spicy testnet.
    function reimbruseWinners(uint256 _challengeId, uint256 _winner) public returns (uint256){
        
    }

}