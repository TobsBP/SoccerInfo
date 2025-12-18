import Image from 'next/image';
import Link from 'next/link';
import DeleteGameButton from '@/app/components/DeleteGameButton';
import EditGameButton from '@/app/components/EditGameButton';
import type { Game } from '@/types/Interfaces/IGame';

export default async function Games() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/games`,
		{ cache: 'no-store' },
	);
	const games: Game[] = await response.json();

	return (
		<main className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 p-8">
			<div className="mx-auto max-w-7xl">
				{/* Header com lineare neon */}
				<div className="mb-8">
					<h1 className="bg-linear-to-r from-zinc-400 via-slate-300 to-zinc-400 bg-clip-text text-5xl font-black text-transparent drop-shadow-[0_0_30px_rgba(100,100,100,0.4)]">
						Games
					</h1>
					<div className="mt-2 h-1 w-32 rounded-full bg-linear-to-r from-zinc-700 via-slate-600 to-zinc-700 shadow-[0_0_15px_rgba(100,100,100,0.5)]" />
				</div>

				{/* Grid de jogos */}
				<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{games.map((game) => (
						<li
							key={game.id}
							className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-zinc-950/95 to-black p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(50,50,50,0.4)]"
						>
							{/* Borda lineare neon */}
							<div className="absolute inset-0 rounded-2xl bg-linear-to-r from-zinc-700/20 via-slate-600/20 to-zinc-700/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

							{/* Efeito de brilho no hover */}
							<div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-zinc-600 via-slate-500 to-zinc-600 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />

							<div className="relative z-10 flex flex-col gap-4">
								<Link href={`/games/${game.id}`} className="block">
									{/* Data */}
									<div className="text-center mb-4">
										<span className="text-xs font-medium text-zinc-600">
											{new Date(game.date).toLocaleDateString('pt-BR')}
										</span>
									</div>

									{/* Logos e Placar */}
									<div className="flex items-center justify-between">
										{/* Home Team */}
										<div className="flex flex-1 flex-col items-center gap-3">
											{game.homeTeam.logoUrl && (
												<div className="relative">
													<div className="absolute inset-0 rounded-full" />
													<Image
														src={game.homeTeam.logoUrl}
														alt={game.homeTeam.name}
														width={56}
														height={56}
														className="relative h-14 w-14 object-cover"
													/>
												</div>
											)}
											<span className="text-center text-sm font-bold text-zinc-300">
												{game.homeTeam.name}
											</span>
										</div>

										{/* Placar Central */}
										<div className="mx-2 flex flex-col items-center">
											<div className="rounded-xl bg-linear-to-r from-zinc-950/80 to-black/80 px-5 py-2 backdrop-blur-sm">
												<span className="bg-linear-to-r from-zinc-200 via-slate-200 to-zinc-200 bg-clip-text text-3xl font-black text-transparent drop-shadow-[0_0_15px_rgba(150,150,150,0.5)]">
													{game.homeScore} — {game.awayScore}
												</span>
											</div>
										</div>

										{/* Away Team */}
										<div className="flex flex-1 flex-col items-center gap-3">
											{game.awayTeam.logoUrl && (
												<div className="relative">
													<div className="absolute inset-0 rounded-full" />
													<Image
														src={game.awayTeam.logoUrl}
														alt={game.awayTeam.name}
														width={56}
														height={56}
														className="relative h-14 w-14 object-cover"
													/>
												</div>
											)}
											<span className="text-center text-sm font-bold text-zinc-300">
												{game.awayTeam.name}
											</span>
										</div>
									</div>
								</Link>

								{/* Ações */}
								<div className="mt-4 flex items-center justify-between border-t border-zinc-800/50 pt-4">
									<div>
										{game.finished ? (
											<span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-[10px] font-bold text-green-500 border border-green-500/20">
												FINALIZADO
											</span>
										) : (
											<span className="rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-[10px] font-bold text-yellow-500 border border-yellow-500/20">
												AGENDADO
											</span>
										)}
									</div>
									<div className="flex items-center gap-2">
										<EditGameButton id={game.id} />
										<DeleteGameButton id={game.id} />
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}
