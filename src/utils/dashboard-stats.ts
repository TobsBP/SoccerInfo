import type { Game } from "@/types/game";

export interface TeamStat {
  name: string;
  points: number;
  wins: number;
  games: number;
}

export interface DashboardStatsResult {
  sortedTeams: TeamStat[];
  gameDistribution: { name: string; value: number }[];
  bestTeam: TeamStat | null;
  bestTeamWinRate: number;
  finishedGames: number;
}

export function calculateDashboardStats(games: Game[]): DashboardStatsResult {
  const teamStats = new Map<number, TeamStat>();
  let homeWins = 0;
  let awayWins = 0;
  let draws = 0;
  let finishedGames = 0;

  games.forEach((game) => {
    if (!game.finished) return;

    finishedGames++;

    // Initialize teams if not exists
    if (!teamStats.has(game.homeTeamId)) {
      teamStats.set(game.homeTeamId, {
        name: game.homeTeam.name,
        points: 0,
        wins: 0,
        games: 0,
      });
    }
    if (!teamStats.has(game.awayTeamId)) {
      teamStats.set(game.awayTeamId, {
        name: game.awayTeam.name,
        points: 0,
        wins: 0,
        games: 0,
      });
    }

    const home = teamStats.get(game.homeTeamId)!;
    const away = teamStats.get(game.awayTeamId)!;

    home.games++;
    away.games++;

    if (game.homeScore > game.awayScore) {
      home.points += 3;
      home.wins++;
      homeWins++;
    } else if (game.awayScore > game.homeScore) {
      away.points += 3;
      away.wins++;
      awayWins++;
    } else {
      home.points += 1;
      away.points += 1;
      draws++;
    }
  });

  const sortedTeams = Array.from(teamStats.values())
    .sort((a, b) => b.points - a.points)
    .slice(0, 5); // Top 5

  const bestTeam = sortedTeams[0] || null;
  const bestTeamWinRate =
    bestTeam && bestTeam.games > 0
      ? Math.round((bestTeam.wins / bestTeam.games) * 100)
      : 0;

  const gameDistribution = [
    { name: "Vitória Casa", value: homeWins },
    { name: "Vitória Visitante", value: awayWins },
    { name: "Empate", value: draws },
  ].filter((d) => d.value > 0);

  return {
    sortedTeams,
    gameDistribution,
    bestTeam,
    bestTeamWinRate,
    finishedGames,
  };
}
