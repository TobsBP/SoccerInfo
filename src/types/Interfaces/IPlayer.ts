import type { Team } from './ITeam';

export interface Player {
	id: number;
	name: string;
	position: string | null;
	number: number | null;
	teamId: number | null;
	lastTeams: string[] | null;
	imageUrl: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface PlayerWithTeam extends Player {
	team: Team | null;
}

export interface PlayerDetailsPageProps {
	params: Promise<{
		id: string;
	}>;
}
