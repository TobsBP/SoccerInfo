import DeleteGameButton from "@/app/components/DeleteGameButton";
import Image from "next/image";

type Game = {
  id: number;
  date: string;
  homeScore: number;
  awayScore: number;
  homeTeam: { name: string; logoUrl?: string };
  awayTeam: { name: string; logoUrl?: string };
};

export default async function Games() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/games`,
    { cache: "no-store" }
  );
  const games: Game[] = await response.json();

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header com lineare neon */}
        <div className="mb-8">
          <h1 className="bg-linear-to-r from-zinc-400 via-slate-300 to-zinc-400 bg-clip-text text-5xl font-black text-transparent drop-shadow-[0_0_30px_rgba(100,100,100,0.4)]">
            Games
          </h1>
          <div className="mt-2 h-1 w-32 rounded-full bg-linear-to-r from-zinc-700 via-slate-600 to-zinc-700 shadow-[0_0_15px_rgba(100,100,100,0.5)]" />
        </div>

        {/* Grid de jogos */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <li
              key={game.id}
              className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-zinc-950/95 to-black p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(50,50,50,0.4)]"
            >
              {/* Borda lineare neon */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-zinc-700/20 via-slate-600/20 to-zinc-700/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Efeito de brilho no hover */}
              <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-zinc-600 via-slate-500 to-zinc-600 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />

              <div className="relative z-10">
                {/* Times */}
                <div className="flex items-center justify-between">
                  {/* Home Team */}
                  <div className="flex items-center gap-3">
                    {game.homeTeam.logoUrl && (
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-linear-to-r from-zinc-600 to-slate-600 opacity-30 blur-md" />
                        <Image
                          src={game.homeTeam.logoUrl}
                          alt={game.homeTeam.name}
                          width={44}
                          height={44}
                          className="relative h-11 w-11 rounded-full border-2 border-zinc-700/50 object-cover shadow-lg shadow-zinc-800/50"
                        />
                      </div>
                    )}
                    <span className="bg-linear-to-r from-zinc-300 to-slate-300 bg-clip-text font-bold text-transparent">
                      {game.homeTeam.name}
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-zinc-500/80 drop-shadow-[0_0_8px_rgba(100,100,100,0.4)]">
                    VS
                  </span>

                  {/* Away Team */}
                  <div className="flex items-center gap-3">
                    <span className="bg-linear-to-r from-slate-300 to-zinc-300 bg-clip-text font-bold text-transparent">
                      {game.awayTeam.name}
                    </span>
                    {game.awayTeam.logoUrl && (
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-linear-to-r from-slate-600 to-zinc-600 opacity-30 blur-md" />
                        <Image
                          src={game.awayTeam.logoUrl}
                          alt={game.awayTeam.name}
                          width={44}
                          height={44}
                          className="relative h-11 w-11 rounded-full border-2 border-zinc-700/50 object-cover shadow-lg shadow-zinc-800/50"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Placar com efeito neon */}
                <div className="mt-6 flex flex-col items-center">
                  <span className="text-sm font-medium text-zinc-600">
                    {new Date(game.date).toLocaleDateString("pt-BR")}
                  </span>
                  <div className="mt-3 rounded-xl bg-linear-to-r from-zinc-950/80 to-black/80 px-6 py-3 backdrop-blur-sm">
                    <span className="bg-linear-to-r from-zinc-200 via-slate-200 to-zinc-200 bg-clip-text text-4xl font-black text-transparent drop-shadow-[0_0_15px_rgba(150,150,150,0.5)]">
                      {game.homeScore} — {game.awayScore}
                    </span>
                  </div>
                </div>

                {/* Ações */}
                <div className="mt-6 flex justify-end">
                  <DeleteGameButton id={game.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}