import { arbitrumSepolia } from "viem/chains";
import { chilizSpicy, fhenixHelium } from "./config";
import { Game, League, Team } from "./type";

export const COINMARKETCAP_IDS: Record<string, number> = {
  eth: 1027,
  chz: 4066,
};

export const LOGOS: Record<string, string> = {
  bar: "https://media.api-sports.io/football/teams/529.png",
  mci: "https://media.api-sports.io/football/teams/50.png",
  inter: "https://media.api-sports.io/football/teams/505.png",
  acm: "https://media.api-sports.io/football/teams/489.png",
  juv: "https://media.api-sports.io/football/teams/496.png",
  psg: "https://media.api-sports.io/football/teams/85.png",
  nap: "https://media.api-sports.io/football/teams/492.png",
  spurs: "https://media.api-sports.io/football/teams/47.png",
  ucl: "https://media.api-sports.io/football/leagues/2.png",
  seriea: "https://media.api-sports.io/football/leagues/135.png",
};

export const leagues: Record<string, League> = {
  ucl: {
    name: "UEFA Champions League",
    abb: "UCL",
    logo: LOGOS.ucl,
  },
  seriea: {
    name: "Serie A",
    abb: "SA",
    logo: LOGOS.seriea,
  },
};

export const teams: Record<string, Team> = {
  bar: {
    name: "FC Barcelona",
    abb: "BAR",
    logo: LOGOS.bar,
  },
  mci: {
    name: "Manchester City",
    abb: "MCI",
    logo: LOGOS.mci,
  },
  inter: {
    name: "Inter Milan",
    abb: "INT",
    logo: LOGOS.inter,
  },
  acm: {
    name: "AC Milan",
    abb: "ACM",
    logo: LOGOS.acm,
  },
  juv: {
    name: "Juventus",
    abb: "JUV",
    logo: LOGOS.juv,
  },
  psg: {
    name: "Paris Saint-Germain",
    abb: "PSG",
    logo: LOGOS.psg,
  },
  nap: {
    name: "Napoli",
    abb: "NAP",
    logo: LOGOS.nap,
  },
  spurs: {
    name: "Tottenham Hotspur",
    abb: "SPURS",
    logo: LOGOS.spurs,
  },
};

export const games: Game[] = [
  {
    home: teams.bar,
    away: teams.mci,
    league: leagues.ucl,
    formattedDate: "11 Sep, 2024",
  },

  {
    home: teams.acm,
    away: teams.spurs,
    league: leagues.ucl,
    formattedDate: "11 Sep, 2024",
  },
  {
    home: teams.juv,
    away: teams.inter,
    league: leagues.seriea,
    formattedDate: "14 Sep, 2024",
  },
  {
    home: teams.psg,
    away: teams.nap,
    league: leagues.ucl,
    formattedDate: "17 Sep, 2024",
  },
];

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
