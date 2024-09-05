import { defineChain } from "viem";
import { arbitrumSepolia } from "viem/chains";
import { http, createConfig } from "wagmi";

export const chilizSpicy = defineChain({
  id: 88882,
  name: "Chiliz Spicy",
  nativeCurrency: {
    decimals: 18,
    name: "CHZ",
    symbol: "CHZ",
  },
  rpcUrls: {
    default: {
      http: ["https://spicy-rpc.chiliz.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Chiliz Spicy Explorer",
      url: "https://testnet.chiliscan.com/",
    },
  },
});
export const fhenixHelium = defineChain({
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
export const config = createConfig({
  chains: [chilizSpicy, fhenixHelium, arbitrumSepolia],
  transports: {
    [chilizSpicy.id]: http("https://spicy-rpc.chiliz.com"),
    [fhenixHelium.id]: http("https://api.helium.fhenix.zone"),
    [arbitrumSepolia.id]: http(),
  },
});
