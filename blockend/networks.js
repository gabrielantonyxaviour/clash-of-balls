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
    core: "0x2F83c19193D54eDC003BC9f99D09634Ba5d3Ac47",
    tokens: {
      acm: "0x87dd08be032a03d937F2A8003dfa9C52821cbaB9",
      bar: "0x45E50677f8DECa7CC582Ad573b525409d1233592",
      int: "0x34c00007cf1Ca7a3D9DccE8cF1D3f75B4db4d37e",
      juv: "0x634c9b919A484913C46362e2E0E700576920c994",
      mci: "0x660e2D9f26542957C7E819f91944d72Cfca32058",
      nap: "0x2452a4eEC9359Ff93C084ed5eD3E21eaC197586D",
      psg: "0xD82ee61aA30d018239350f9843cB8A4967B8b3da",
      tot: "0xD0b9383c34297bD7A9d01c2FA8Da22124dfE1Ec5",
    },
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
    compute: "0x103E9467CF92707E5240b18C51B04cbE805433eb",
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
    sportsOracle: "0xe1E99CB95683Cf44403ee53864e5336294898de0",
  },
};

module.exports = {
  networks,
};
