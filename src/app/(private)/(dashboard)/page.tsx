import { Game } from "@/types/game";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardStats } from "./components/DashboardStats";
import { GamesGrid } from "./components/GamesGrid";

async function getGames(): Promise<Game[]> {
  const res = await fetch('http://localhost:3000/api/games', {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch games');
  }

  return res.json();
}

export default async function Dashboard() {
  const games = await getGames();

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 p-8">
      <main className="mx-auto max-w-7xl">
        <DashboardHeader />
        <DashboardStats games={games} />
        <GamesGrid games={games} />
      </main>
    </div>
  );
}