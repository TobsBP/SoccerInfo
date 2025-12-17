import DeleteTeamButton from "@/app/components/DeleteTeamButton";
import Image from "next/image";

type Team = {
  id: number;
  name: string;
  logoUrl?: string | null;
};

export default async function Teams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/teams`,
    { cache: "no-store" }
  );
  const teams: Team[] = await response.json();

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header com lineare neon */}
        <div className="mb-8">
          <h1 className="bg-linear-to-r from-zinc-400 via-slate-300 to-zinc-400 bg-clip-text text-5xl font-black text-transparent drop-shadow-[0_0_30px_rgba(100,100,100,0.4)]">
            Teams
          </h1>
          <div className="mt-2 h-1 w-32 rounded-full bg-linear-to-r from-zinc-700 via-slate-600 to-zinc-700 shadow-[0_0_15px_rgba(100,100,100,0.5)]" />
        </div>

        {/* Grid de times */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teams.map((team) => (
            <li
              key={team.id}
              className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-zinc-950/95 to-black p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(50,50,50,0.4)]"
            >
              {/* Borda lineare neon */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-zinc-700/20 via-slate-600/20 to-zinc-700/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Efeito de brilho no hover */}
              <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-zinc-600 via-slate-500 to-zinc-600 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />

              <div className="relative z-10">
                {/* Info do time */}
                <div className="flex items-center gap-4">
                  {team.logoUrl && (
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 rounded-full bg-linear-to-r from-zinc-600 to-slate-600 opacity-30 blur-md" />
                      <Image
                        src={team.logoUrl}
                        alt={team.name}
                        width={56}
                        height={56}
                        className="relative h-14 w-14 rounded-full border-2 border-zinc-700/50 object-cover shadow-lg shadow-zinc-800/50"
                      />
                    </div>
                  )}
                  <span className="flex-1 bg-linear-to-r from-zinc-200 to-slate-200 bg-clip-text text-lg font-bold text-transparent">
                    {team.name}
                  </span>
                </div>

                {/* Ação */}
                <div className="mt-4 flex justify-end border-t border-zinc-800/50 pt-4">
                  <DeleteTeamButton id={team.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}