const { createWalletClient, defineChain, createPublicClient } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const {
  abi,
} = require("../build/artifacts/contracts/FhenixCompute.sol/FhenixCompute.json");

async function call() {
  const fhenixHelium = defineChain({
    id: 8008135,
    name: "Fhenix Helium",
    nativeCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH",
    },
    rpcUrls: {
      default: {
        http: ["https://api.helium.fhenix.zone"],
      },
    },
    blockExplorers: {
      default: {
        name: "Fhenix Helium Explorer",
        url: "https://explorer.helium.fhenix.zone/",
      },
    },
  });
  const account = privateKeyToAccount("0x" + process.env.TEST_PRIVATE_KEY);
  const publicClient = createPublicClient({
    chain: fhenixHelium,
    transport: http(),
  });

  const client = createWalletClient({
    account,
    chain: fhenixHelium,
    transport: http(),
  });

  const address = "0x605827Ad62DCA8e6167169fb8cbCFD90e9813180";
  const { request } = await publicClient.simulateContract({
    account,
    address,
    abi,
    functionName: "testSendCrosschain",
    args: ["1", "152913", "154", "276", "645", "634"],
  });
  const tx = await client.writeContract(request);
  console.log(tx);
}

call();
