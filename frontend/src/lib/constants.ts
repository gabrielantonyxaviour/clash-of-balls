import { arbitrumSepolia } from "viem/chains";
import { chilizSpicy, fhenixHelium } from "./config";

export const COINMARKETCAP_IDS: Record<string, number> = {
  eth: 1027,
  chz: 4066,
};

export const supportedchains: Record<string, any> = {
  [chilizSpicy.id]: {
    id: 1,
    name: chilizSpicy.name,
    image: "/coins/chiliz.png",
    chainId: chilizSpicy.id,
    symbol: chilizSpicy.nativeCurrency.symbol,
    explorer: chilizSpicy.blockExplorers.default.url,
  },
  [fhenixHelium.id]: {
    id: 2,
    name: fhenixHelium.name,
    chainId: fhenixHelium.id,
    symbol: fhenixHelium.nativeCurrency.symbol,
    image: "/coins/fhenix.jpeg",
    explorer: fhenixHelium.blockExplorers.default.url,
  },
  [arbitrumSepolia.id]: {
    id: 3,
    name: "Arbitrum Sepolia",
    chainId: arbitrumSepolia.id,
    symbol: "ETH",
    image: "/coins/arbitrum.png",
    explorer: "https://sepolia.arbiscan.io/",
  },
};
