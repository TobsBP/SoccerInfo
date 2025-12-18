'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Team } from '@/types/Interfaces/ITeam';
import { InputField } from './fields/InputField';
import { SubmitButton } from './fields/SubmitButton';

interface TeamFormProps {
	initialData: Team;
}

export default function TeamForm({ initialData }: TeamFormProps) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: initialData.name,
		city: initialData.city || '',
		state: initialData.state || '',
		foundedYear: initialData.foundedYear || '',
		logoUrl: initialData.logoUrl || '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const res = await fetch(`/api/teams/${initialData.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					foundedYear: formData.foundedYear
						? parseInt(formData.foundedYear.toString(), 10)
						: null,
				}),
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || 'Failed to update team');
			}

			router.push('/teams');
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

			{/* Name */}
			<InputField
				label="Team Name"
				id="name"
				name="name"
				type="text"
				value={formData.name}
				onChange={handleChange}
				required
				placeholder="Enter team name"
			/>

			{/* City & State */}
			<div className="grid grid-cols-2 gap-4">
				<InputField
					label="City"
					id="city"
					name="city"
					type="text"
					value={formData.city}
					onChange={handleChange}
					placeholder="Enter city"
				/>
				<InputField
					label="State"
					id="state"
					name="state"
					type="text"
					value={formData.state}
					onChange={handleChange}
					placeholder="Enter state"
				/>
			</div>

			{/* Founded Year */}
			<InputField
				label="Founded Year"
				id="foundedYear"
				name="foundedYear"
				type="number"
				value={formData.foundedYear}
				onChange={handleChange}
				placeholder="YYYY"
			/>

			{/* Logo URL */}
			<InputField
				label="Logo URL"
				id="logoUrl"
				name="logoUrl"
				type="url"
				value={formData.logoUrl}
				onChange={handleChange}
				placeholder="https://example.com/logo.png"
			/>

			{/* Submit Button */}
			<SubmitButton
				isLoading={isLoading}
				label="Save Changes"
				loadingLabel="Saving..."
			/>
		</form>
	);
}
