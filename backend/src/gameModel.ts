import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createGame(
  boardSize: number,
  playerOneId: number,
  playerTwoId: number,
  winnerId: number | null
) {
  const game = await prisma.game.create({
    data: { boardSize, playerOneId, playerTwoId, winnerId }
  });
  return game.id;
}

// Currently fetching all players game history and organising by player ID, good for a global leaderboard

export async function getStats() {
  const games = await prisma.game.findMany();

  const stats: Record<number, { wins: number; losses: number; draws: number }> = {};

  for (const game of games) {
    const { playerOneId, playerTwoId, winnerId } = game;

    // Initialize each player if not yet in stats
    if (!stats[playerOneId]) stats[playerOneId] = { wins: 0, losses: 0, draws: 0 };
    if (!stats[playerTwoId]) stats[playerTwoId] = { wins: 0, losses: 0, draws: 0 };

    if (winnerId === null) {
      stats[playerOneId].draws++;
      stats[playerTwoId].draws++;
    } else if (winnerId === playerOneId) {
      stats[playerOneId].wins++;
      stats[playerTwoId].losses++;
    } else {
      stats[playerTwoId].wins++;
      stats[playerOneId].losses++;
    }
  }

  return stats;
}