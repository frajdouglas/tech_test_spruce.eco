import type{ Stats } from "./types";

const apiUrl = process.env.API_URL || "http://localhost:3000";

export async function createGame({
  boardSize,
  playerOneId,
  playerTwoId,
  winnerId,
}: {
  boardSize: number;
  playerOneId: number;
  playerTwoId: number;
  winnerId?: number | null;
}) {
  try {
    const res = await fetch(`${apiUrl}/api/game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        boardSize,
        playerOneId,
        playerTwoId,
        winnerId: winnerId ?? null,
      }),
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    return res.json() as Promise<{ id: string }>;
  } catch (err) {
    console.error('Failed to create game:', err);
    throw err;
  }
}

export async function getStats(): Promise<Stats> {
  try {
    const res = await fetch(`${apiUrl}/api/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    return res.json() as Promise<Stats>;
  } catch (err) {
    console.error('Failed to fetch stats:', err);
    throw err;
  }
}