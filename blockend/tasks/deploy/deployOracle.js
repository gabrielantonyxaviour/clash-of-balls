const { networks } = require("../../networks");

task("deploy-oracle", "Deploys the SportsOracle contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    if (network.name != "arbitrumSepolia") {
      console.log("\nThis task is only for arbitrumSepolia network\n");
      return;
    }

    console.log(`Deploying SportsOracle contract to ${network.name}`);

    console.log("\n__Compiling Contracts__");
    await run("compile");

    const oracleContractFactory = await ethers.getContractFactory(
      "SportsOracle"
    );

    const args = [networks.arbitrumSepolia.functionsRouter];

    const oracleContract = await oracleContractFactory.deploy(...args);

    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        oracleContract.deployTransaction.hash
      } to be confirmed...`
    );

    await oracleContract.deployTransaction.wait(
      networks[network.name].confirmations
    );

    console.log("\nDeployed SportsOracle contract to:", oracleContract.address);

    if (network.name === "localFunctionsTestnet") {
      return;
    }

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
          address: oracleContract.address,
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
      `\n SportsOracle contract deployed to ${oracleContract.address} on ${network.name}`
    );
  });
