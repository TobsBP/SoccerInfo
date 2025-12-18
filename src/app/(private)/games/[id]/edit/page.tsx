import { notFound } from 'next/navigation';
import GameForm from '@/app/components/Forms/GameForm';
import prisma from '@/lib/prisma';
import type { Game } from '@/types/Interfaces/IGame';

export default async function EditGamePage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;
	const id = parseInt(params.id, 10);

	if (Number.isNaN(id)) {
		notFound();
	}

	const [game, teams] = await Promise.all([
		prisma.games.findUnique({
			where: { id },
			include: {
				homeTeam: true,
				awayTeam: true,
			},
		}),
		prisma.teams.findMany({
			orderBy: { name: 'asc' },
		}),
	]);

	if (!game) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 p-8 flex items-center justify-center">
			<div className="w-full max-w-2xl relative">
				{/* Background effects */}
				<div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-zinc-800/20 blur-3xl" />
				<div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-slate-800/20 blur-3xl" />

				<div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-zinc-950/95 to-black p-8 shadow-2xl backdrop-blur-sm border border-zinc-800/50">
					<div className="mb-8">
						<h1 className="bg-linear-to-r from-zinc-200 via-slate-100 to-zinc-200 bg-clip-text text-3xl font-black text-transparent">
							Edit Game
						</h1>
						<p className="text-zinc-500 mt-2">Update the match details below</p>
					</div>

					<GameForm initialData={game as unknown as Game} teams={teams} />
				</div>
			</div>
		</main>
	);
}
