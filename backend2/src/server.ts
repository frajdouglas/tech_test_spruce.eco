import express from 'express';
import cors from 'cors';
import { createGame, getStats } from './gameModel.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/stats', async (req, res) => {
  const stats = await getStats();
  res.json(stats);
});

app.post('/api/game', async (req, res) => {
  const { boardSize, playerOneId, playerTwoId, winnerId } = req.body;

  if (!boardSize || !playerOneId || !playerTwoId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = await createGame(boardSize, playerOneId, playerTwoId, winnerId ?? null);
  res.status(201).json({ id });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
