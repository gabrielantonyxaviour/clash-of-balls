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
    verifyApiKey: "UNSET",
    chainId: 88882,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "CHZ",
    mailbox: "",
  },
  fhenixTestnet: {
    url: "https://api.helium.fhenix.zone",
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: "UNSET",
    chainId: 8008135,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "tFHE",
    mailbox: "",
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
    mailbox: "",
  },
};

module.exports = {
  networks,
};
