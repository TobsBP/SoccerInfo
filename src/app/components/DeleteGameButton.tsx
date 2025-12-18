'use client';

import { useRouter } from 'next/navigation';

export default function DeleteGameButton({ id }: { id: number }) {
	const router = useRouter();

	const handleDelete = async () => {
		if (!confirm('Tem certeza que deseja deletar este jogo?')) return;

		try {
			const res = await fetch(`/api/games/${id}`, {
				method: 'DELETE',
			});

			if (res.ok) {
				router.refresh();
			} else {
				const error = await res.json();
				alert(`Erro ao deletar: ${error.error || 'Erro desconhecido'}`);
			}
		} catch (err) {
			console.log('Erro de conexão ao tentar deletar:', err);
		}
	};

	return (
		<button
			type="button"
			onClick={handleDelete}
			className="text-red-500 hover:text-red-700 ml-4 font-bold"
			aria-label="Deletar jogo"
		>
			✕
		</button>
	);
}
