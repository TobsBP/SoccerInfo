'use client';
import { useLanguage } from '@/contexts/LanguageContext';

export function DashboardHeader() {
	const { t } = useLanguage();
	return (
		<div className="mb-8">
			<h1 className="bg-linear-to-r from-zinc-400 via-slate-300 to-zinc-400 bg-clip-text text-5xl font-black text-transparent drop-shadow-[0_0_30px_rgba(100,100,100,0.4)]">
				{t('dashboard')}
			</h1>
			<div className="mt-2 h-1 w-32 rounded-full bg-linear-to-r from-zinc-700 via-slate-600 to-zinc-700 shadow-[0_0_15px_rgba(100,100,100,0.5)]" />
		</div>
	);
}
