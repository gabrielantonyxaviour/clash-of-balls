require("@chainlink/env-enc").config();

const DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS = 3;

const PRIVATE_KEY = process.env.TEST_PRIVATE_KEY;

const accounts = [];
if (PRIVATE_KEY) {
  accounts.push(PRIVATE_KEY);
}
const networks = {
  chilizSpicy: {
    url: "https://spicy-rpc.chiliz.com",
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: "RANDOM",
    chainId: 88882,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "CHZ",
    mailbox: "0xa8ec309E062b0B986284c19a7A14AE2F1f4D4D0F",
    core: "0x3E72a614A4A14d3AeD58D76A7A5E886B2376c96A",
  },
  fhenixTestnet: {
    url: "https://api.helium.fhenix.zone",
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: "TEMP",
    chainId: 8008135,
    confirmations: 2,
    nativeCurrencySymbol: "tFHE",
    mailbox: "0x1eA99e28e7Be6317977961A0b0Ab65C256285e7D",
    compute: "",
  },
  arbitrumSepolia: {
    url:
      "https://arb-sepolia.g.alchemy.com/v2/" +
      process.env.ALCHEMY_API_KEY_BASE,
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.ARBISCAN_API_KEY || "UNSET",
    chainId: 421614,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
    mailbox: "0x48ca4C272Ed60751aA0E4d9835BCa1Bb1a91f749",
    functionsRouter: "0x234a5fb5Bd614a7AA2FfAB244D603abFA0Ac5C5C",
    subId: "170",
    donId: "fun-arbitrum-sepolia-1",
    linkTokenAddress: "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E",
    sportsOracle: "0xF3F33A969565B9E5a37231C564D3654Fd4fDb01e",
  },
};

module.exports = {
  networks,
};
