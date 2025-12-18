import type { Game } from '@/types/Interfaces/IGame';
import { GameCard } from './GameCard';

interface GamesGridProps {
	games: Game[];
}

export function GamesGrid({ games }: GamesGridProps) {
	if (games.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center rounded-2xl bg-linear-to-br from-zinc-950/95 to-black p-12 text-center shadow-xl backdrop-blur-sm border border-zinc-800/50">
				<svg
					className="mb-4 h-16 w-16 text-zinc-700"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>No Scheduled Games Icon</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
					/>
				</svg>
				<p className="text-lg text-zinc-500">Nenhum jogo agendado ainda</p>
			</div>
		);
	}

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{games.map((game) => (
				<GameCard key={game.id} game={game} />
			))}
		</div>
	);
}
