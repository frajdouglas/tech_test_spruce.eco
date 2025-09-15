import { db } from './db.js';

export async function createGame(boardSize: number, playerOneId: number, playerTwoId: number, winnerId: number | null) {
  const result = await db.run(
    'INSERT INTO GAMES (boardSize, playerOneId, playerTwoId, winnerId, createdAt) VALUES (?, ?, ?, ?, ?)',
    boardSize,
    playerOneId,
    playerTwoId,
    winnerId,
    new Date().toISOString()
  );
  return result.lastID;
}

export async function getGames() {
  return await db.all('SELECT * FROM GAMES ORDER BY id DESC');
}

export async function getGameById(id: number) {
  return await db.get('SELECT * FROM GAMES WHERE id = ?', id);
}
