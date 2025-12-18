import { ArrowLeft, Shirt, Trophy, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { PlayerDetailsPageProps } from '@/types/Interfaces/IPlayer';

export default async function PlayerDetailsPage(props: PlayerDetailsPageProps) {
	const params = await props.params;
	const id = parseInt(params.id, 10);

	if (Number.isNaN(id)) {
		notFound();
	}

	const player = await prisma.players.findUnique({
		where: { id },
		include: {
			team: true,
		},
	});

	if (!player) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 p-8">
			<div className="mx-auto max-w-4xl">
				<Link
					href="/players"
					className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-200"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Players
				</Link>

				{/* Player Header */}
				<div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-zinc-900/50 to-black p-8 shadow-2xl backdrop-blur-xl border border-zinc-800/50">
					<div className="absolute inset-0 bg-linear-to-r from-zinc-800/10 via-slate-700/10 to-zinc-800/10" />

					<div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
						{/* Avatar/Number */}
						<div className="relative shrink-0">
							<div className="absolute inset-0 rounded-full bg-zinc-500 opacity-20 blur-2xl" />
							<div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-zinc-800 bg-zinc-900 text-5xl font-bold text-zinc-700 shadow-xl">
								{player.number || '#'}
							</div>
						</div>

						<div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
							<h1 className="text-4xl font-black text-white md:text-5xl drop-shadow-lg">
								{player.name}
							</h1>

							<div className="flex items-center gap-4 text-zinc-400">
								{player.team && (
									<div className="flex items-center gap-2 rounded-full bg-zinc-800/50 px-4 py-1.5 border border-zinc-700/50">
										{player.team.logoUrl ? (
											<Image
												src={player.team.logoUrl}
												alt={player.team.name}
												width={20}
												height={20}
												className="rounded-full"
											/>
										) : (
											<div className="h-5 w-5 rounded-full bg-zinc-700" />
										)}
										<span className="font-medium text-zinc-200">
											{player.team.name}
										</span>
									</div>
								)}
								<div className="flex items-center gap-2 rounded-full bg-zinc-800/50 px-4 py-1.5 border border-zinc-700/50">
									<User className="h-4 w-4 text-zinc-500" />
									<span className="font-medium text-zinc-200">
										{player.position || 'Unknown Position'}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Stats Grid */}
				<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					<div className="rounded-2xl bg-zinc-900/50 p-6 border border-zinc-800/50">
						<div className="mb-2 flex items-center gap-2 text-zinc-500">
							<Trophy className="h-4 w-4" />
							<span className="text-xs uppercase tracking-wider font-semibold">
								Gols
							</span>
						</div>
						<span className="text-3xl font-bold text-white">{player.gols}</span>
					</div>
					<div className="rounded-2xl bg-zinc-900/50 p-6 border border-zinc-800/50">
						<div className="mb-2 flex items-center gap-2 text-zinc-500">
							<Shirt className="h-4 w-4" />
							<span className="text-xs uppercase tracking-wider font-semibold">
								Assistências
							</span>
						</div>
						<span className="text-3xl font-bold text-white">
							{player.assists}
						</span>
					</div>
					<div className="rounded-2xl bg-yellow-900/10 p-6 border border-yellow-900/20">
						<div className="mb-2 flex items-center gap-2 text-yellow-600/70">
							<div className="h-4 w-3 rounded-[1px] bg-yellow-500" />
							<span className="text-xs uppercase tracking-wider font-semibold">
								Cartões Amarelos
							</span>
						</div>
						<span className="text-3xl font-bold text-yellow-500">
							{player.yellowCards}
						</span>
					</div>
					<div className="rounded-2xl bg-red-900/10 p-6 border border-red-900/20">
						<div className="mb-2 flex items-center gap-2 text-red-600/70">
							<div className="h-4 w-3 rounded-[1px] bg-red-500" />
							<span className="text-xs uppercase tracking-wider font-semibold">
								Cartões Vermelhos
							</span>
						</div>
						<span className="text-3xl font-bold text-red-500">
							{player.redCards}
						</span>
					</div>
				</div>

				{/* Last Teams History */}
				<div className="mt-8 rounded-2xl bg-zinc-900/50 p-8 border border-zinc-800/50">
					<h2 className="mb-6 text-xl font-bold text-white flex items-center gap-2">
						<Shirt className="h-5 w-5 text-zinc-400" />
						Clubes Anteriores
					</h2>
					{player.lastTeams && player.lastTeams.length > 0 ? (
						<div className="flex flex-wrap gap-3">
							{player.lastTeams.map((team) => (
								<div
									key={team}
									className="rounded-full bg-zinc-800/50 px-4 py-2 border border-zinc-700/50 text-zinc-300 font-medium hover:bg-zinc-800 transition-colors"
								>
									{team}
								</div>
							))}
						</div>
					) : (
						<p className="text-zinc-500 italic">
							Não temos o histórico de times desse jogador.
						</p>
					)}
				</div>

				<div className="mt-8 flex justify-end">
					{/* Placeholders for Edit/Delete actions if needed later */}
				</div>
			</div>
		</main>
	);
}
