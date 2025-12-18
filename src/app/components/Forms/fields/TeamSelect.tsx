'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Team } from '@/types/Interfaces/ITeam';

interface TeamSelectProps {
	label: string;
	id: string;
	value: number;
	options: Team[];
	onChange: (id: number) => void;
	placeholder: string;
}

export function TeamSelect({
	label,
	id,
	value,
	options,
	onChange,
	placeholder,
}: TeamSelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const selectedTeam = options.find((t) => t.id === value);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="space-y-2" ref={containerRef}>
			<label htmlFor={id} className="block text-sm font-medium text-zinc-300">
				{label}
			</label>
			<div className="relative">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="flex w-full items-center justify-between rounded-xl border border-zinc-800/50 bg-black/50 px-4 py-3 text-left text-zinc-100 backdrop-blur-xl transition-all duration-300 focus:border-zinc-500/50 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
				>
					<span className={selectedTeam ? 'text-zinc-100' : 'text-zinc-500'}>
						{selectedTeam ? selectedTeam.name : placeholder}
					</span>
					<ChevronDown
						className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
					/>
				</button>

				{isOpen && (
					<div className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-1 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
						<div className="space-y-0.5">
							{options.map((team) => (
								<button
									key={team.id}
									type="button"
									onClick={() => {
										onChange(team.id);
										setIsOpen(false);
									}}
									className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
										team.id === value
											? 'bg-zinc-800 text-white'
											: 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
									}`}
								>
									<span>{team.name}</span>
									{team.id === value && (
										<Check className="h-4 w-4 text-zinc-100" />
									)}
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
