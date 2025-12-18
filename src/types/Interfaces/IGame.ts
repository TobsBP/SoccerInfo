import type { Team } from './ITeam';

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

export interface GameDetailsPageProps {
	params: Promise<{
		id: string;
	}>;
}
