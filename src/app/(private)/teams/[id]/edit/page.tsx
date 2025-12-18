import { notFound } from 'next/navigation';
import TeamForm from '@/app/components/TeamForm';
import type { Team } from '@/types/Interfaces/ITeam';

export default async function EditTeamPage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;
	const { id } = params;

	// Fetch team data
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/teams/${id}`,
		{ cache: 'no-store' },
	);

	if (!response.ok) {
		if (response.status === 404) {
			notFound();
		}
		throw new Error('Failed to fetch team data');
	}

	const team: Team = await response.json();

	return (
		<main className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 p-8 flex items-center justify-center">
			<div className="w-full max-w-2xl relative">
				{/* Background effects */}
				<div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-zinc-800/20 blur-3xl" />
				<div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-slate-800/20 blur-3xl" />

				<div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-zinc-950/95 to-black p-8 shadow-2xl backdrop-blur-sm border border-zinc-800/50">
					<div className="mb-8">
						<h1 className="bg-linear-to-r from-zinc-200 via-slate-100 to-zinc-200 bg-clip-text text-3xl font-black text-transparent">
							Edit Team
						</h1>
						<p className="text-zinc-500 mt-2">
							Update the team information below
						</p>
					</div>

					<TeamForm initialData={team} />
				</div>
			</div>
		</main>
	);
}
