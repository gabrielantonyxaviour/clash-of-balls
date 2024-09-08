import type { SupportedProvider } from "fhenixjs";
import type { ethers } from "ethers";
export interface Team {
  name: string;
  abb: string;
  logo: string;
  players: PlayerStruct[];
}
export interface PlayerStruct {
  player: Player;
}
export interface Player {
  id: number;
  name: string;
  number: number;
  pos: string;
  grid: string | null;
}
export interface League {
  name: string;
  logo: string;
  abb: string;
}

export interface Game {
  home: Team;
  away: Team;
  league: League;
  formattedDate: string;
  fixtureId: number;
}

export interface Prediction {
  desc: string;
  type: number;
  basePoints: number;
  multiplier: number;
}

export interface PredictionInput {
  index: number;
  resultantDesc: string;
  params: string[];
}

export type ExtendedProvider = SupportedProvider & {
  getTransactionReceipt(txHash: string): Promise<ethers.TransactionReceipt>;
  send(method: string, params: any[] | Record<string, any>): Promise<any>;
  getSigner(): Promise<any>;
  getBalance(address: string): Promise<any>;
};
