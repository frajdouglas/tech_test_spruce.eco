import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function initDB() {
  db = await open({
    filename: 'app.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS GAMES (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      boardSize INTEGER NOT NULL,
      playerOneId INTEGER NOT NULL,
      playerTwoId INTEGER NOT NULL,
      winnerId INTEGER,
      createdAt TEXT NOT NULL
    )
  `);
}
