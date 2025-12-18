'use client';

import { Activity, Percent, Trophy } from 'lucide-react';
import { useMemo } from 'react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Game } from '@/types/Interfaces/IGame';
import { calculateDashboardStats } from '@/utils/dashboard-stats';

interface DashboardChartsProps {
	games: Game[];
}

const COLORS = ['#71717a', '#52525b', '#a1a1aa']; // Zinc shades

export function DashboardCharts({ games }: DashboardChartsProps) {
	const { t } = useLanguage();
	const stats = useMemo(() => calculateDashboardStats(games), [games]);

	const translatedDistribution = useMemo(() => {
		return stats.gameDistribution.map((item) => ({
			...item,
			name:
				item.name === 'Vitória Casa'
					? t('homeWins')
					: item.name === 'Vitória Visitante'
						? t('awayWins')
						: t('draws'),
		}));
	}, [stats.gameDistribution, t]);

	if (stats.finishedGames === 0) {
		return (
			<div className="mt-8 flex flex-col items-center justify-center rounded-2xl bg-linear-to-br from-zinc-950/95 to-black p-12 text-center shadow-xl backdrop-blur-sm border border-zinc-800/50">
				<Activity className="mb-4 h-16 w-16 text-zinc-700" />
				<p className="text-lg text-zinc-500">{t('notEnoughData')}</p>
				<p className="mt-2 text-sm text-zinc-600">
					{t('awaitingFinishedGames')}
				</p>
			</div>
		);
	}

	return (
		<div className="mt-8 space-y-6">
			{/* Cards de Destaque */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-zinc-950/95 to-black p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]">
					<div className="absolute inset-0 rounded-2xl bg-linear-to-r from-zinc-700/10 via-slate-600/10 to-zinc-700/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					<div className="relative z-10 flex items-center gap-4">
						<div className="rounded-xl bg-zinc-800/50 p-3 shadow-[0_0_15px_rgba(161,161,170,0.2)]">
							<Trophy className="h-6 w-6 text-zinc-400" />
						</div>
						<div>
							<p className="text-sm text-zinc-500">{t('bestTeam')}</p>
							<p className="bg-linear-to-r from-zinc-200 to-slate-200 bg-clip-text text-xl font-bold text-transparent">
								{stats.bestTeam?.name || '-'}
							</p>
							<p className="text-xs text-zinc-600">
								{stats.bestTeam?.points || 0} {t('points')}
							</p>
						</div>
					</div>
				</div>

				<div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-zinc-950/95 to-black p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]">
					<div className="absolute inset-0 rounded-2xl bg-linear-to-r from-zinc-700/10 via-slate-600/10 to-zinc-700/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					<div className="relative z-10 flex items-center gap-4">
						<div className="rounded-xl bg-zinc-800/50 p-3 shadow-[0_0_15px_rgba(161,161,170,0.2)]">
							<Activity className="h-6 w-6 text-zinc-400" />
						</div>
						<div>
							<p className="text-sm text-zinc-500">{t('performanceLeader')}</p>
							<p className="bg-linear-to-r from-zinc-200 to-slate-200 bg-clip-text text-xl font-bold text-transparent">
								{stats.bestTeamWinRate}%
							</p>
							<p className="text-xs text-zinc-600">{t('ofWins')}</p>
						</div>
					</div>
				</div>

				<div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-zinc-950/95 to-black p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]">
					<div className="absolute inset-0 rounded-2xl bg-linear-to-r from-zinc-700/10 via-slate-600/10 to-zinc-700/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					<div className="relative z-10 flex items-center gap-4">
						<div className="rounded-xl bg-zinc-800/50 p-3 shadow-[0_0_15px_rgba(161,161,170,0.2)]">
							<Percent className="h-6 w-6 text-zinc-400" />
						</div>
						<div>
							<p className="text-sm text-zinc-500">{t('totalAnalyzed')}</p>
							<p className="bg-linear-to-r from-zinc-200 to-slate-200 bg-clip-text text-xl font-bold text-transparent">
								{stats.finishedGames}
							</p>
							<p className="text-xs text-zinc-600">{t('finishedGames')}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* Gráfico de Top Times */}
				<div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-zinc-950/95 to-black p-6 shadow-xl backdrop-blur-sm">
					<div className="absolute inset-0 rounded-2xl bg-linear-to-r from-zinc-700/10 via-slate-600/10 to-zinc-700/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					<div className="relative z-10">
						<h3 className="mb-6 bg-linear-to-r from-zinc-300 to-slate-300 bg-clip-text text-lg font-bold text-transparent">
							{t('topTeams')}
						</h3>
						<div className="h-80 w-full">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={stats.sortedTeams}>
									<CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
									<XAxis
										dataKey="name"
										stroke="#52525b"
										tick={{ fill: '#71717a', fontSize: 12 }}
										tickLine={{ stroke: '#52525b' }}
									/>
									<YAxis
										stroke="#52525b"
										tick={{ fill: '#71717a', fontSize: 12 }}
										tickLine={{ stroke: '#52525b' }}
									/>
									<Tooltip
										contentStyle={{
											backgroundColor: '#09090b',
											borderColor: '#27272a',
											borderRadius: '12px',
											color: '#f4f4f5',
											boxShadow: '0 0 20px rgba(0,0,0,0.5)',
										}}
										itemStyle={{ color: '#f4f4f5' }}
										cursor={{ fill: '#18181b' }}
									/>
									<Bar
										dataKey="points"
										fill="url(#barGradient)"
										radius={[8, 8, 0, 0]}
										name={t('pointsLabel')}
									/>
									<defs>
										<linearGradient
											id="barGradient"
											x1="0"
											y1="0"
											x2="0"
											y2="1"
										>
											<stop offset="0%" stopColor="#71717a" stopOpacity={1} />
											<stop offset="100%" stopColor="#3f3f46" stopOpacity={1} />
										</linearGradient>
									</defs>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>

				{/* Gráfico de Distribuição de Resultados */}
				<div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-zinc-950/95 to-black p-6 shadow-xl backdrop-blur-sm">
					<div className="absolute inset-0 rounded-2xl bg-linear-to-r from-zinc-700/10 via-slate-600/10 to-zinc-700/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					<div className="relative z-10">
						<h3 className="mb-6 bg-linear-to-r from-zinc-300 to-slate-300 bg-clip-text text-lg font-bold text-transparent">
							{t('resultsDistribution')}
						</h3>
						<div className="h-80 w-full">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={translatedDistribution}
										cx="50%"
										cy="50%"
										innerRadius={70}
										outerRadius={100}
										paddingAngle={3}
										dataKey="value"
									>
										{translatedDistribution.map((entry, index) => (
											<Cell
												key={entry.name}
												fill={COLORS[index % COLORS.length]}
												stroke="#09090b"
												strokeWidth={2}
											/>
										))}
									</Pie>
									<Tooltip
										contentStyle={{
											backgroundColor: '#09090b',
											borderColor: '#27272a',
											borderRadius: '12px',
											color: '#f4f4f5',
											boxShadow: '0 0 20px rgba(0,0,0,0.5)',
										}}
										itemStyle={{ color: '#f4f4f5' }}
									/>
									<Legend
										wrapperStyle={{ color: '#a1a1aa' }}
										iconType="circle"
									/>
								</PieChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
