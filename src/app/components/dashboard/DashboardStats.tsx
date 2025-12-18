'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Game } from '@/types/game';

interface DashboardStatsProps {
	games: Game[];
}

export function DashboardStats({ games }: DashboardStatsProps) {
	const { t } = useLanguage();

	return (
		<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
			<div className="rounded-xl bg-gradient-to-br from-zinc-950/95 to-black p-4 shadow-xl backdrop-blur-sm border border-zinc-800/50">
				<p className="text-sm text-zinc-500">{t('totalGames')}</p>
				<p className="mt-1 text-3xl font-bold text-zinc-200">{games.length}</p>
			</div>
			<div className="rounded-xl bg-gradient-to-br from-zinc-950/95 to-black p-4 shadow-xl backdrop-blur-sm border border-zinc-800/50">
				<p className="text-sm text-zinc-500">{t('finished')}</p>
				<p className="mt-1 text-3xl font-bold text-green-400">
					{games.filter((g) => g.finished).length}
				</p>
			</div>
			<div className="rounded-xl bg-gradient-to-br from-zinc-950/95 to-black p-4 shadow-xl backdrop-blur-sm border border-zinc-800/50">
				<p className="text-sm text-zinc-500">{t('scheduled')}</p>
				<p className="mt-1 text-3xl font-bold text-yellow-400">
					{games.filter((g) => !g.finished).length}
				</p>
			</div>
		</div>
	);
}
