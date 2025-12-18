'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Game } from '@/types/Interfaces/IGame';
import type { Team } from '@/types/Interfaces/ITeam';
import { InputField } from './fields/InputField';
import { SubmitButton } from './fields/SubmitButton';
import { TeamSelect } from './fields/TeamSelect';
import { ToggleField } from './fields/ToggleField';

interface GameFormProps {
	initialData: Game;
	teams: Team[];
}

export default function GameForm({ initialData, teams }: GameFormProps) {
	const router = useRouter();

	const formatDateForInput = (dateString: string) => {
		const date = new Date(dateString);
		return date.toISOString().slice(0, 16);
	};

	const [formData, setFormData] = useState({
		date: formatDateForInput(initialData.date),
		homeTeamId: initialData.homeTeamId,
		awayTeamId: initialData.awayTeamId,
		homeScore: initialData.homeScore,
		awayScore: initialData.awayScore,
		finished: initialData.finished,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;

		if (type === 'checkbox') {
			const { checked } = e.target;
			setFormData((prev) => ({ ...prev, [name]: checked }));
		} else if (name === 'homeScore' || name === 'awayScore') {
			setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleTeamChange = (name: 'homeTeamId' | 'awayTeamId', id: number) => {
		setFormData((prev) => ({ ...prev, [name]: id }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		if (formData.homeTeamId === formData.awayTeamId) {
			setError('Home team and Away team cannot be the same.');
			setIsLoading(false);
			return;
		}

		try {
			const res = await fetch(`/api/games/${initialData.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					date: new Date(formData.date).toISOString(),
				}),
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || 'Failed to update game');
			}

			router.push('/games');
			router.refresh();
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('An unexpected error occurred');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{error && (
				<div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20">
					{error}
				</div>
			)}

			{/* Date */}
			<InputField
				label="Date & Time"
				id="date"
				name="date"
				type="datetime-local"
				value={formData.date}
				onChange={handleChange}
				required
			/>

			{/* Teams */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<TeamSelect
					label="Home Team"
					id="homeTeamId"
					value={formData.homeTeamId}
					options={teams}
					onChange={(id) => handleTeamChange('homeTeamId', id)}
					placeholder="Select Home Team"
				/>
				<TeamSelect
					label="Away Team"
					id="awayTeamId"
					value={formData.awayTeamId}
					options={teams}
					onChange={(id) => handleTeamChange('awayTeamId', id)}
					placeholder="Select Away Team"
				/>
			</div>

			{/* Scores */}
			<div className="grid grid-cols-2 gap-4">
				<InputField
					label="Home Score"
					id="homeScore"
					name="homeScore"
					type="number"
					min="0"
					value={formData.homeScore}
					onChange={handleChange}
				/>
				<InputField
					label="Away Score"
					id="awayScore"
					name="awayScore"
					type="number"
					min="0"
					value={formData.awayScore}
					onChange={handleChange}
				/>
			</div>

			{/* Finished */}
			<ToggleField
				label="Match Finished"
				id="finished"
				name="finished"
				checked={formData.finished}
				onChange={handleChange}
			/>

			{/* Submit Button */}
			<SubmitButton
				isLoading={isLoading}
				label="Salvar Alterações"
				loadingLabel="Salvando..."
			/>
		</form>
	);
}
