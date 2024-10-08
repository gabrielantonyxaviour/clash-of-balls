# Clash of Balls

**Clash of Balls** is a decentralized 1v1 football prediction battle on Chiliz where users can make encrypted predictions using Fully Homomorphic Encryption (FHENIX). The app is built on Warpcast using Farcaster Composer Actions and Farcaster Frames. The project is built with Chainlink Functions Decentralized Oracle, Hyperlane, Fhenix, and Arbitrum. This project is developed for the ETHGlobal Online 2024 Hackathon.

### Overview

Clash of Balls allows users to create and accept football prediction challenges using Chiliz (CHZ). The game is designed to be secure, transparent, and decentralized, offering users a unique way to engage with football fixtures and their favorite teams.

### Key Features:

1. **1v1 Challenges:** Create or accept open challenges based on upcoming football fixtures.
2. **Predictions:** Choose 5 predictions from a predefined list of 10, plus 1 additional prediction for tie-breaking.
3. **Betting:** Bet using CHZ, with dynamic fee discounts based on Fan token holdings.
4. **Fully Homomorphic Encryption:** Securely encrypt your predictions and place them on-chain.
5. **Decentralized Oracle:** Use Chainlink Functions to fetch and post match results on-chain.
6. **Cross-Chain Communication:** Hyperlane connects Chiliz, Fhenix, and Arbitrum to ensure seamless gameplay and computation.

## How It Works

### 1. Challenge Creation:

- Select an upcoming football fixture.
- Choose 5 predictions from the provided list and 1 additional prediction as a tie-breaker.
- Choose a bet amount in Chiliz (CHZ).
- Encrypt your selections using Fully Homomorphic Encryption (FHE).
- Submit the encrypted challenge and bet amount on-chain via Warpcast using Farcaster Composer Actions.
- Post the challenge as a cast on Warpcast.

### 2. Challenge Acceptance:

- Any user can view the open challenges on Warpcast.
- To accept a challenge, the user selects the same predictions and sends the required CHZ to confirm the game.
- The user then replies to the challenge cast with a "challenge accepted" cast.

### 3. Betting & Rewards:

- Each player bets a certain amount of CHZ (e.g., 10 CHZ).
- The winner receives 80% of the total pool (e.g., 16 CHZ), with the remaining 20% (e.g., 4 CHZ) used to cover game fees.
- Fee discounts are available based on Fan token holdings:
- 5% discount if one player holds more Fan tokens of their team than the other.
- 10% discount if one player holds more Fan tokens of both teams.

### 4. Game Result and Reward Distribution:

- Chainlink Functions fetch the game results and post them on-chain.
- Fhenix computes the points based on the predictions and reveals the winner on the Chiliz chain.
- Rewards are automatically distributed based on the outcome.

## Possible Predictions

When creating a challenge, users can choose 5 + 1 predictions from the following 10 options:

| **Prediction**                                    | **Base Points** | **Multiplier** |
| ------------------------------------------------- | --------------- | -------------- |
| **Match ends in draw (YES/NO)**                   | 3               | 1.0            |
| **Both teams score goals (YES/NO)**               | 2               | 1.0            |
| **Both teams' goals from 1 to N or more**         | 3               | 1.2            |
| **Penalties in a match from 1 to N or more**      | 3               | 1.8            |
| **Corners in a match from 1 to N or more**        | 1.5             | 1.1            |
| **Team wins by goals from 1 to N or more**        | 3               | 1.2            |
| **Team scores in first half from 1 to N or more** | 2               | 1.2            |
| **Team scores goals from 1 to N or more**         | 2               | 1.1            |
| **Player scores goals from 1 to N or more**       | 3               | 1.4            |
| **Player gets booked from 1 to 2**                | 3               | 2.0            |

These predictions allow users to engage with the game in a strategic way, choosing outcomes they believe are likely while balancing the potential points they can earn.

## Send data from Chainlink to Fhenix

uint128; 16 bytes capacity
Team A Half time Goal - uint8 (1 byte)
Team B Half time Goal - uint8 (1 byte)
Team A Full time Goal - uint8 (1 byte)
Team B Full time Goal - uint8 (1 byte)
Total Penalties - uint8 (1 byte)
Total Corners - uint8 (1 byte)
Goals of players - uint8 (1 byte each = 2 bytes)
Yellow cards of players - uint8 (1 byte each = 2 bytes)
Empty bytes - (6 bytes)

## Create Prediction Param

# Chiliz

Core contract in Chiliz

`https://github.com/gabrielantonyxaviour/clash-of-balls/blob/main/blockend/contracts/ClashOfBalls.sol`

Fan tokens in Chiliz

`https://github.com/gabrielantonyxaviour/clash-of-balls/tree/main/blockend/contracts/fan-tokens`

Deployed contracts in Chiliz

`https://github.com/gabrielantonyxaviour/clash-of-balls/blob/main/blockend/networks.js#L22`

Contract call integration in Frontend

`https://github.com/gabrielantonyxaviour/clash-of-balls/blob/main/frontend/src/components/sections/composer/confirm-challenge.tsx#L160`

# Fhenix

Private Compute in Fhenix

`https://github.com/gabrielantonyxaviour/clash-of-balls/blob/main/blockend/contracts/FhenixCompute.sol`

Deployed contracts in Fhenix

`https://github.com/gabrielantonyxaviour/clash-of-balls/blob/main/blockend/networks.js#L44`

# Chainlink

Chainlink Functions Source Script

`https://github.com/gabrielantonyxaviour/clash-of-balls/blob/main/blockend/oracle/source.js`

Sports Oracle contract

`https://github.com/gabrielantonyxaviour/clash-of-balls/blob/main/blockend/contracts/SportsOracle.sol`

Contract deployment in Arbitrum Sepolia

`https://github.com/gabrielantonyxaviour/clash-of-balls/blob/main/blockend/networks.js#L62`

# XMTP

1 to 1 in app chat messaging 

`https://github.com/gabrielantonyxaviour/clash-of-balls/blob/main/frontend/src/components/sections/xmtp-chat.tsx`

## Technology Stack

- **Blockchain:** Chiliz
- **Encrypted Computation** Fhenix | Fully Homomorphic Encryption (FHE)
- **Social Platform:** Farcaster (Warpcast)
- **Decentralized Oracle:** Chainlink Functions (Arbitrum)
- **Cross-Chain Infrastructure:** Hyperlane

## Try it out

https://gabrielaxy.com
