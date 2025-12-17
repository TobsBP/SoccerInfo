export interface Team {
  id: number;
  name: string;
  logoUrl: string | null;
}

export interface Game {
  id: number;
  date: string;
  homeTeamId: number;
  awayTeamId: number;
  homeScore: number;
  awayScore: number;
  finished: boolean;
  homeTeam: Team;
  awayTeam: Team;
}