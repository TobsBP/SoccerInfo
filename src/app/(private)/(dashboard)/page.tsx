import type { Game } from "@/types/Interfaces/IGame";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import { DashboardStats } from "../../components/dashboard/DashboardStats";
import { DashboardCharts } from "../../components/dashboard/DashboardCharts";

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
        <DashboardCharts games={games} />
      </main>
    </div>
  );
}