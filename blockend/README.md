# ClashOfBalls Contracts

Contracts for ClashOfBalls.

## Tech

1. Hyperlane
   a. Cross Chain Transactions
2. Chiliz
   a. Game logic
   b. Fan token integration
3. Arbtirum and Chainlink
   a. Decentralized Compute
4. Fhenix
   a. Confidential Compute
5. XMTP
   a. In app messaging
6. Web3Auth
   a. Wallet provider
7. Farcaster
   b. Composer Actions
   c. Frames

## ClashOfBallsCore Contract Specification ( Deployed on Chiliz )

1. Create challenge (Direct call)
   1. Sends CHZ bet amount. (The fan tokens owned for the respective games are automatically detected for the fixture)
   2. Sends encrypted prediction data on chain and stored in Chiliz.
   3. Waits for someone to agree to the challenge
2. Modify Challenge (Direct call)
   1. Sends counter CHZ bet (After discussing in the XMTP chat)
   2. Sets the modifier of the challenge. Only some other address can accept the challenge.
   3. User can either increase or decrease the bet or can modify the encrypted predictions.
3. Accept Challenge (Direct call)
   1. User needs to send the correct amount of CHZ required by the bet. (The fan tokens owned for the respective games are automatically detected for the fixture)
   2. Find who owns higher amount of fan tokens and return the discount back
   3. Sends encrypted prediction data on chain and stored in Chiliz.
4. Receive Results (Crosschain call from Arbitrum)
   1. Receives game results from Chainlink Functions and stores it in Chiliz.
5. Find winner (Direct call and sends crosschain call to Fhenix)
   1. Sends the encrypted predictions and the game results from Chainlink to Fhenix and wait for results.
6. Reward Winner (Crosschain call from Fhenix)
   1. It returns the decrypted predictions and points of the players.
   2. Declares the winner and releases the rewards in CHZ.

## ClashOfBallsOracle Contract Specification ( Deployed on Arbitrum )

1. Trigger Oracle (Direct call and sends crosschain transaction to Chiliz)
   1. Gets the game id as input and triggers Chainlink Functions to get all the game statistics.
   2. Once the game statistics are fetched, it sends a cross chain transaction to Chiliz.

## ClashOfBallsCompute Contract Specification ( Deployed on Fhenix )

1. Compute points (Crosschain call from Chiliz)
   1. Decrypt the encrypted predictions and the game results fetched from Chainlink and return back the points scored by each and the winner

## Tasks

1. Test Hyperlane + Chainlink
2. Test Chiliz Basic Logic + Hyperlane
3. Integrate Fhenix in frontend
4. Test Fhenix in contracts

## Deploy Order

1. Deploy ClashOfBallsCore on Chiliz
2. Deploy ClashOfBallsOracle on Arbitrum
3. Deploy ClashOfBallsCompute (on Fhenix)
4. Initialize ClashOfBallsCore

## Deployments

1. ClashOfBallsCore (Chiliz) -
2. ClashOfBallsOracle (Arbitrum) -
3. ClashOfBallsCompute (Fhenix) -

## Contributors

- Gabriel - Blockchain Engineer & Architect

## License

This monorepo is licensed under the [MIT License](LICENSE).
