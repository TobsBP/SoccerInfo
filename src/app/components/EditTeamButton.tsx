import Link from "next/link";
import { Pencil } from "lucide-react";

export default function EditTeamButton({ id }: { id: number }) {
  return (
    <Link
      href={`/teams/${id}/edit`}
      className="text-zinc-400 hover:text-white transition-colors p-1"
      aria-label="Edit team"
    >
      <Pencil size={18} />
    </Link>
  );
}
