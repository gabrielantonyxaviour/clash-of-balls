const { networks } = require("../../networks");

task("deploy-fan-tokens", "Deploys the FanTokens contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying FanTokens  to ${network.name}`);

    console.log("\n__Compiling Contracts__");
    await run("compile");
    const tokens = [
      "ACMilan",
      "FCBarcelona",
      "InterMilan",
      "Juventus",
      "ManchesterCity",
      "Napoli",
      "ParisSaintGermain",
      "TottenhamHotspur",
    ];

    for (let i = 0; i < tokens.length; i++) {
      const tokensFactory = await ethers.getContractFactory(tokens[i]);
      const args = ["0x0429A2Da7884CA14E53142988D5845952fE4DF6a"];
      const tokenContract = await tokensFactory.deploy(...args);

      console.log(
        `\nWaiting ${
          networks[network.name].confirmations
        } blocks for transaction ${
          tokenContract.deployTransaction.hash
        } to be confirmed...`
      );

      await tokenContract.deployTransaction.wait(
        networks[network.name].confirmations
      );

      console.log(
        "\nDeployed ",
        tokens[i],
        " contract to:",
        tokenContract.address
      );

      const verifyContract = taskArgs.verify;
      if (
        network.name !== "localFunctionsTestnet" &&
        verifyContract &&
        !!networks[network.name].verifyApiKey &&
        networks[network.name].verifyApiKey !== "UNSET"
      ) {
        try {
          console.log("\nVerifying contract...");
          await run("verify:verify", {
            contract: "contracts/fan-tokens/" + tokens[i] + ".sol:" + tokens[i],
            address: tokenContract.address,
            constructorArguments: args,
          });
          console.log("Contract verified");
        } catch (error) {
          if (!error.message.includes("Already Verified")) {
            console.log(
              "Error verifying contract.  Ensure you are waiting for enough confirmation blocks, delete the build folder and try again."
            );
            console.log(error);
          } else {
            console.log("Contract already verified");
          }
        }
      } else if (verifyContract && network.name !== "localFunctionsTestnet") {
        console.log(
          "\nPOLYGONSCAN_API_KEY, ETHERSCAN_API_KEY or FUJI_SNOWTRACE_API_KEY is missing. Skipping contract verification..."
        );
      }

      console.log(
        `\n ${tokens[i]} contract deployed to ${tokenContract.address} on ${network.name}`
      );
    }
  });
