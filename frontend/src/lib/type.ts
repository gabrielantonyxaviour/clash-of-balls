export interface Team {
  name: string;
  abb: string;
  logo: string;
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
