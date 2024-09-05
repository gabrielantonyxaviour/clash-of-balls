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
