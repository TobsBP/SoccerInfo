import {
	ArrowLeft,
	Building2,
	Calendar,
	Globe,
	MapPin,
	Trophy,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { TeamDetailsPageProps } from '@/types/Interfaces/ITeam';

export default async function TeamDetailsPage(props: TeamDetailsPageProps) {
	const params = await props.params;
	const id = parseInt(params.id, 10);

	if (Number.isNaN(id)) {
		notFound();
	}

	const team = await prisma.teams.findUnique({
		where: { id },
	});

	if (!team) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 p-8">
			<div className="mx-auto max-w-4xl">
				<Link
					href="/teams"
					className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-200"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Teams
				</Link>

				{/* Header Card */}
				<div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-zinc-900/50 to-black p-8 shadow-2xl backdrop-blur-xl border border-zinc-800/50">
					<div className="absolute inset-0 bg-linear-to-r from-zinc-800/10 via-slate-700/10 to-zinc-800/10" />

					<div className="relative z-10 flex flex-col items-center gap-6 md:flex-row md:items-start">
						{/* Logo */}
						<div className="relative">
							<div className="absolute inset-0 rounded-full bg-linear-to-r from-zinc-500 to-slate-500 opacity-20 blur-2xl" />
							{team.logoUrl ? (
								<Image
									src={team.logoUrl}
									alt={team.name}
									width={128}
									height={128}
									className="relative h-32 w-32 object-cover shadow-2xl"
								/>
							) : (
								<div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-zinc-800 bg-zinc-900 text-3xl font-bold text-zinc-700">
									{team.name.substring(0, 2).toUpperCase()}
								</div>
							)}
						</div>

						<div className="flex-1 text-center md:text-left">
							<h1 className="bg-linear-to-r from-zinc-100 via-slate-200 to-zinc-100 bg-clip-text text-4xl font-black text-transparent md:text-5xl">
								{team.name}
							</h1>

							<div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
								{(team.city || team.state) && (
									<div className="flex items-center gap-2 rounded-full bg-zinc-800/50 px-4 py-1.5 text-sm text-zinc-300">
										<MapPin className="h-4 w-4 text-zinc-500" />
										<span>
											{team.city}
											{team.city && team.state && ', '}
											{team.state}
										</span>
									</div>
								)}
								{team.country && (
									<div className="flex items-center gap-2 rounded-full bg-zinc-800/50 px-4 py-1.5 text-sm text-zinc-300">
										<Globe className="h-4 w-4 text-zinc-500" />
										<span>{team.country}</span>
									</div>
								)}
								{team.foundedYear && (
									<div className="flex items-center gap-2 rounded-full bg-zinc-800/50 px-4 py-1.5 text-sm text-zinc-300">
										<Calendar className="h-4 w-4 text-zinc-500" />
										<span>Est. {team.foundedYear}</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="mt-8 grid gap-8 md:grid-cols-2">
					{/* Info Card */}
					<div className="rounded-3xl bg-linear-to-br from-zinc-900/30 to-black p-8 shadow-xl border border-zinc-800/30">
						<h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-zinc-200">
							<Building2 className="h-5 w-5 text-zinc-500" />
							Club Details
						</h2>
						<div className="space-y-4">
							<div className="flex justify-between border-b border-zinc-800/50 pb-3">
								<span className="text-zinc-500">Stadium</span>
								<span className="font-medium text-zinc-300">
									{team.stadium || '-'}
								</span>
							</div>
							<div className="flex justify-between border-b border-zinc-800/50 pb-3">
								<span className="text-zinc-500">Colors</span>
								<span className="font-medium text-zinc-300">
									{team.colors || '-'}
								</span>
							</div>
							<div className="flex justify-between border-b border-zinc-800/50 pb-3">
								<span className="text-zinc-500">Website</span>
								<span className="font-medium text-zinc-300">
									{team.website ? (
										<a
											href={team.website}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-400 hover:underline"
										>
											Visit
										</a>
									) : (
										'-'
									)}
								</span>
							</div>
						</div>
					</div>

					{/* Titles Card */}
					<div className="rounded-3xl bg-linear-to-br from-zinc-900/30 to-black p-8 shadow-xl border border-zinc-800/30">
						<h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-zinc-200">
							<Trophy className="h-5 w-5 text-yellow-500/80" />
							Honors
						</h2>
						<div className="grid grid-cols-2 gap-4">
							<div className="rounded-2xl bg-zinc-900/50 p-4 text-center">
								<p className="text-3xl font-black text-zinc-200">
									{team.titlesTotal}
								</p>
								<p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
									Total Titles
								</p>
							</div>
							<div className="rounded-2xl bg-zinc-900/50 p-4 text-center">
								<p className="text-3xl font-black text-zinc-200">
									{team.titlesLeague}
								</p>
								<p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
									League
								</p>
							</div>
							<div className="rounded-2xl bg-zinc-900/50 p-4 text-center">
								<p className="text-3xl font-black text-zinc-200">
									{team.titlesCup}
								</p>
								<p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
									Cups
								</p>
							</div>
							<div className="rounded-2xl bg-zinc-900/50 p-4 text-center">
								<p className="text-3xl font-black text-zinc-200">
									{team.titlesIntl}
								</p>
								<p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
									International
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
