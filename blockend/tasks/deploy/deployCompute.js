const { networks } = require("../../networks");

task("deploy-compute", "Deploys the FhenixCompute contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying FhenixCompute contract to ${network.name}`);

    console.log("\n__Compiling Contracts__");
    await run("compile");

    const fhenixComputeContractFactory = await ethers.getContractFactory(
      "FhenixCompute"
    );

    const args = [
      networks.fhenixTestnet.mailbox,
      networks.chilizSpicy.core,
      networks.arbitrumSepolia.sportsOracle,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ];

    const fhenixComputeContract = await fhenixComputeContractFactory.deploy(
      ...args
    );

    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        fhenixComputeContract.deployTransaction.hash
      } to be confirmed...`
    );

    await fhenixComputeContract.deployTransaction.wait(
      networks[network.name].confirmations
    );

    console.log(
      "\nDeployed FhenixCompute contract to:",
      fhenixComputeContract.address
    );

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
          address: fhenixComputeContract.address,
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
      `\n FhenixCompute contract deployed to ${fhenixComputeContract.address} on ${network.name}`
    );
  });
