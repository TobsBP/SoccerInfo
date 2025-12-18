import Image from 'next/image';
import Link from 'next/link';
import type { PlayerWithTeam } from '@/types/Interfaces/IPlayer';

export default async function Players() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/players`,
		{ cache: 'no-store' },
	);
	const players: PlayerWithTeam[] = await response.json();

	return (
		<main className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 p-8">
			<div className="mx-auto max-w-7xl">
				{/* Header com lineare neon */}
				<div className="mb-8">
					<h1 className="bg-linear-to-r from-zinc-400 via-slate-300 to-zinc-400 bg-clip-text text-5xl font-black text-transparent drop-shadow-[0_0_30px_rgba(100,100,100,0.4)]">
						Players
					</h1>
					<div className="mt-2 h-1 w-32 rounded-full bg-linear-to-r from-zinc-700 via-slate-600 to-zinc-700 shadow-[0_0_15px_rgba(100,100,100,0.5)]" />
				</div>

				{/* Grid de jogadores */}
				<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{players.map((player) => (
						<li
							key={player.id}
							className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-zinc-950/95 to-black shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(50,50,50,0.4)]"
						>
							<Link href={`/players/${player.id}`} className="block h-full p-6">
								{/* Borda lineare neon */}
								<div className="absolute inset-0 rounded-2xl bg-linear-to-r from-zinc-700/20 via-slate-600/20 to-zinc-700/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

								{/* Efeito de brilho no hover */}
								<div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-zinc-600 via-slate-500 to-zinc-600 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />

								<div className="relative z-10 flex h-full flex-col justify-between">
									<div className="flex items-center gap-4">
										{/* Avatar Placeholder */}
										<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xl font-bold text-zinc-400">
											{player.number || '#'}
										</div>

										<div className="flex flex-col">
											<span className="bg-linear-to-r from-zinc-200 to-slate-200 bg-clip-text text-lg font-bold text-transparent group-hover:text-white transition-colors">
												{player.name}
											</span>
											<div className="flex flex-col text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
												{player.position && <span>{player.position}</span>}
												{player.team && (
													<div className="flex items-center gap-1 mt-1">
														{player.team.logoUrl && (
															<Image
																src={player.team.logoUrl}
																alt={player.team.name}
																width={16}
																height={16}
																className="rounded-full"
															/>
														)}
														<span>{player.team.name}</span>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}
