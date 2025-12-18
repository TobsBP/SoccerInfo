import { Pencil } from 'lucide-react';
import Link from 'next/link';

export default function EditGameButton({ id }: { id: number }) {
	return (
		<Link
			href={`/games/${id}/edit`}
			className="text-zinc-400 hover:text-white transition-colors p-1"
			aria-label="Edit game"
		>
			<Pencil size={18} />
		</Link>
	);
}
