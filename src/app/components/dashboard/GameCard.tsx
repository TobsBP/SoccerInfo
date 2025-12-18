import Image from 'next/image';
import type { Game } from '@/types/game';

interface GameCardProps {
	game: Game;
}

export function GameCard({ game }: GameCardProps) {
	return (
		<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-950/95 to-black p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(50,50,50,0.4)]">
			{/* Borda lineare */}
			<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-zinc-700/20 via-slate-600/20 to-zinc-700/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

			{/* Glow effect */}
			<div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-zinc-600 via-slate-500 to-zinc-600 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />

			<div className="relative z-10">
				{/* Status Badge */}
				<div className="mb-4 flex items-center justify-between">
					<span className="text-sm text-zinc-600">
						{new Date(game.date).toLocaleDateString('pt-BR')}
					</span>
					{game.finished ? (
						<span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
							Finalizado
						</span>
					) : (
						<span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.3)]">
							Agendado
						</span>
					)}
				</div>

				{/* Teams */}
				<div className="mb-4 flex items-center justify-between">
					{/* Home Team */}
					<div className="flex items-center gap-3">
						{game.homeTeam.logoUrl && (
							<div className="relative">
								<div className="absolute inset-0 rounded-full bg-gradient-to-r from-zinc-600 to-slate-600 opacity-30 blur-md" />
								<Image
									src={game.homeTeam.logoUrl}
									alt={game.homeTeam.name}
									width={40}
									height={40}
									className="relative h-10 w-10 rounded-full border-2 border-zinc-700/50 object-cover shadow-lg shadow-zinc-800/50"
								/>
							</div>
						)}
						<span className="bg-gradient-to-r from-zinc-300 to-slate-300 bg-clip-text font-bold text-transparent">
							{game.homeTeam.name}
						</span>
					</div>

					<span className="text-sm font-semibold text-zinc-500/80">VS</span>

					{/* Away Team */}
					<div className="flex items-center gap-3">
						<span className="bg-gradient-to-r from-slate-300 to-zinc-300 bg-clip-text font-bold text-transparent">
							{game.awayTeam.name}
						</span>
						{game.awayTeam.logoUrl && (
							<div className="relative">
								<div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-600 to-zinc-600 opacity-30 blur-md" />
								<Image
									src={game.awayTeam.logoUrl}
									alt={game.awayTeam.name}
									width={40}
									height={40}
									className="relative h-10 w-10 rounded-full border-2 border-zinc-700/50 object-cover shadow-lg shadow-zinc-800/50"
								/>
							</div>
						)}
					</div>
				</div>

				{/* Score */}
				<div className="flex items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-zinc-950/80 to-black/80 px-6 py-4 backdrop-blur-sm">
					<span className="bg-gradient-to-r from-zinc-200 via-slate-200 to-zinc-200 bg-clip-text text-4xl font-black text-transparent drop-shadow-[0_0_15px_rgba(150,150,150,0.5)]">
						{game.homeScore}
					</span>
					<span className="text-2xl text-zinc-600">—</span>
					<span className="bg-gradient-to-r from-zinc-200 via-slate-200 to-zinc-200 bg-clip-text text-4xl font-black text-transparent drop-shadow-[0_0_15px_rgba(150,150,150,0.5)]">
						{game.awayScore}
					</span>
				</div>
			</div>
		</div>
	);
}
