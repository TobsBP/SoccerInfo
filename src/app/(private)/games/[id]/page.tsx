import { ArrowLeft, Calendar, Clock, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { GameDetailsPageProps } from '@/types/Interfaces/IGame';

export default async function GameDetailsPage(props: GameDetailsPageProps) {
	const params = await props.params;
	const id = parseInt(params.id, 10);

	if (Number.isNaN(id)) {
		notFound();
	}

	const game = await prisma.games.findUnique({
		where: { id },
		include: {
			homeTeam: true,
			awayTeam: true,
		},
	});

	if (!game) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 p-8">
			<div className="mx-auto max-w-4xl">
				<Link
					href="/games"
					className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-200"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Games
				</Link>

				{/* Match Header */}
				<div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-zinc-900/50 to-black p-8 shadow-2xl backdrop-blur-xl border border-zinc-800/50">
					<div className="absolute inset-0 bg-linear-to-r from-zinc-800/10 via-slate-700/10 to-zinc-800/10" />

					<div className="relative z-10">
						<div className="mb-8 flex items-center justify-between">
							<div className="flex items-center gap-2 rounded-full bg-zinc-800/50 px-4 py-1.5 text-sm text-zinc-300">
								<Calendar className="h-4 w-4 text-zinc-500" />
								<span>{new Date(game.date).toLocaleDateString('pt-BR')}</span>
							</div>
							{game.finished ? (
								<span className="rounded-full bg-green-500/20 px-4 py-1.5 text-xs font-bold text-green-400 border border-green-500/30">
									FINALIZADO
								</span>
							) : (
								<span className="rounded-full bg-yellow-500/20 px-4 py-1.5 text-xs font-bold text-yellow-400 border border-yellow-500/30">
									AGENDADO
								</span>
							)}
						</div>

						<div className="flex flex-col items-center justify-between gap-8 md:flex-row">
							{/* Home Team */}
							<div className="flex flex-1 flex-col items-center gap-4 text-center">
								<div className="relative">
									<div className="absolute inset-0 rounded-full bg-zinc-500 opacity-20 blur-2xl" />
									{game.homeTeam.logoUrl ? (
										<Image
											src={game.homeTeam.logoUrl}
											alt={game.homeTeam.name}
											width={120}
											height={120}
											className="relative h-24 w-24 object-cover md:h-32 md:w-32"
										/>
									) : (
										<div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-zinc-800 bg-zinc-900 text-3xl font-bold text-zinc-700 md:h-32 md:w-32">
											{game.homeTeam.name.substring(0, 2).toUpperCase()}
										</div>
									)}
								</div>
								<h2 className="text-xl font-bold text-zinc-100 md:text-2xl">
									{game.homeTeam.name}
								</h2>
							</div>

							{/* Score */}
							<div className="flex flex-col items-center gap-2">
								<div className="flex items-center gap-4 rounded-2xl bg-zinc-900/80 px-8 py-6 border border-zinc-800/50 shadow-inner">
									<span className="text-5xl font-black text-zinc-100 md:text-7xl">
										{game.homeScore}
									</span>
									<span className="text-3xl font-light text-zinc-600">—</span>
									<span className="text-5xl font-black text-zinc-100 md:text-7xl">
										{game.awayScore}
									</span>
								</div>
								<span className="text-sm font-medium uppercase tracking-widest text-zinc-500">
									Versus
								</span>
							</div>

							{/* Away Team */}
							<div className="flex flex-1 flex-col items-center gap-4 text-center">
								<div className="relative">
									<div className="absolute inset-0 rounded-full bg-zinc-500 opacity-20 blur-2xl" />
									{game.awayTeam.logoUrl ? (
										<Image
											src={game.awayTeam.logoUrl}
											alt={game.awayTeam.name}
											width={120}
											height={120}
											className="relative h-24 w-24 object-cover md:h-32 md:w-32"
										/>
									) : (
										<div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-zinc-800 bg-zinc-900 text-3xl font-bold text-zinc-700 md:h-32 md:w-32">
											{game.awayTeam.name.substring(0, 2).toUpperCase()}
										</div>
									)}
								</div>
								<h2 className="text-xl font-bold text-zinc-100 md:text-2xl">
									{game.awayTeam.name}
								</h2>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-8 grid gap-8 md:grid-cols-2">
					{/* Match Info */}
					<div className="rounded-3xl bg-linear-to-br from-zinc-900/30 to-black p-8 shadow-xl border border-zinc-800/30">
						<h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-zinc-200">
							<Clock className="h-5 w-5 text-zinc-500" />
							Informações da Partida
						</h2>
						<div className="space-y-4">
							<div className="flex justify-between border-b border-zinc-800/50 pb-3">
								<span className="text-zinc-500">Data</span>
								<span className="font-medium text-zinc-300">
									{new Date(game.date).toLocaleDateString('pt-BR', {
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</span>
							</div>
							<div className="flex justify-between border-b border-zinc-800/50 pb-3">
								<span className="text-zinc-500">Horário</span>
								<span className="font-medium text-zinc-300">
									{new Date(game.date).toLocaleTimeString('pt-BR', {
										hour: '2-digit',
										minute: '2-digit',
									})}
								</span>
							</div>
							<div className="flex justify-between border-b border-zinc-800/50 pb-3">
								<span className="text-zinc-500">Status</span>
								<span className="font-medium text-zinc-300">
									{game.finished ? 'Finalizado' : 'Agendado'}
								</span>
							</div>
						</div>
					</div>

					{/* Venue/Extra Info */}
					<div className="rounded-3xl bg-linear-to-br from-zinc-900/30 to-black p-8 shadow-xl border border-zinc-800/30">
						<h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-zinc-200">
							<Trophy className="h-5 w-5 text-yellow-500/80" />
							Estádio & Local
						</h2>
						<div className="space-y-4">
							<div className="flex justify-between border-b border-zinc-800/50 pb-3">
								<span className="text-zinc-500">Local</span>
								<span className="font-medium text-zinc-300">
									{game.homeTeam.stadium || 'Não informado'}
								</span>
							</div>
							<div className="flex justify-between border-b border-zinc-800/50 pb-3">
								<span className="text-zinc-500">Cidade</span>
								<span className="font-medium text-zinc-300">
									{game.homeTeam.city || '-'}
								</span>
							</div>
							<div className="flex justify-between border-b border-zinc-800/50 pb-3">
								<span className="text-zinc-500">Estado</span>
								<span className="font-medium text-zinc-300">
									{game.homeTeam.state || '-'}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
