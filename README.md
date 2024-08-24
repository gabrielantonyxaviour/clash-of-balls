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

1. **Challenge Creation:**

- Select an upcoming football fixture.
- Choose 5 predictions from the provided list and 1 additional prediction as a tie-breaker.
- Choose a bet amount in Chiliz (CHZ).
- Encrypt your selections using Fully Homomorphic Encryption (FHE).
- Submit the encrypted challenge and bet amount on-chain via Warpcast using Farcaster Composer Actions.
- Post the challenge as a cast on Warpcast.

2. **Challenge Acceptance:**

- Any user can view the open challenges on Warpcast.
- To accept a challenge, the user selects the same predictions and sends the required CHZ to confirm the game.
- The user then replies to the challenge cast with a "challenge accepted" cast.

3. **Betting and Rewards:**

- Each player bets a certain amount of CHZ (e.g., 10 CHZ).
- The winner receives 80% of the total pool (e.g., 16 CHZ), with the remaining 20% (e.g., 4 CHZ) used to cover game fees.
- Fee discounts are available based on Fan token holdings:
- 5% discount if one player holds more Fan tokens of their team than the other.
- 10% discount if one player holds more Fan tokens of both teams.

4. **Game Result and Reward Distribution:**

- Chainlink Functions fetch the game results and post them on-chain.
- Fhenix computes the points based on the predictions and reveals the winner on the Chiliz chain.
- Rewards are automatically distributed based on the outcome.

## Technology Stack

- Blockchain: Chiliz
- Encryption: Fully Homomorphic Encryption (FHE)
- Decentralized Communication: Warpcast, Farcaster Composer Actions
- Oracle: Chainlink Functions Decentralized Oracle
- Cross-Chain Infrastructure: Hyperlane
- Computation: Fhenix (for computing on encrypted states)
- Result Publishing: Arbitrum (fetching results and publishing to Fhenix)
