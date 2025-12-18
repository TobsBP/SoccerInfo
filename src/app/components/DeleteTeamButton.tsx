"use client";

import { useRouter } from "next/navigation";

export default function DeleteTeamButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja deletar este time?")) return;

    try {
      const res = await fetch(`/api/teams/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        const error = await res.json();
        alert(`Erro ao deletar: ${error.error || "Erro desconhecido"}`);
      }
    } catch (err) {
      console.log("Erro de conexão ao tentar deletar:", err);
    }
  };

  return (
    <button
      type="submit"
      className="text-zinc-400 hover:text-white transition-colors ml-4 font-bold"
      aria-label="Delete team"
      onClick={handleDelete}
    >
      X
    </button>
  );
}
