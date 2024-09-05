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
  params: string[];
}
