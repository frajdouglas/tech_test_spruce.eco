import express from 'express';
import cors from 'cors';
import { initDB } from './db.js';
import { createGame, getGames, getGameById } from './gameModel.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Initialize DB first
await initDB();

// Routes
app.get('/', (req, res) => res.send('Hello, SQLite + TypeScript + Express!'));

app.get('/api/games', async (req, res) => {
  const games = await getGames();
  res.json(games);
});

app.get('/api/games/:id', async (req, res) => {
  const game = await getGameById(Number(req.params.id));
  if (!game) return res.status(404).json({ error: 'Game not found' });
  res.json(game);
});

app.post('/api/games', async (req, res) => {
  const { boardSize, playerOneId, playerTwoId, winnerId } = req.body;
  if (!boardSize || !playerOneId || !playerTwoId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const id = await createGame(boardSize, playerOneId, playerTwoId, winnerId ?? null);
  res.status(201).json({ id });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
