import React, { useState, useEffect } from 'react'
import { XorO } from './types'
import { checkForWinnerOrDraw } from './utils/checkForWinnerOrDraw'
import { createEmptyBoard } from './utils/createEmptyBoard'
import { createGame, getStats } from './api'
import type { Stats } from './types'

export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>(() => createEmptyBoard(3))
  const [currentPlayer, setCurrentPlayer] = useState<XorO>('X')
  const [gameResult, setGameResult] = useState<XorO | 'draw' | null>(null);
  const [boardSize, setBoardSize] = useState<number>(3);
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const fetchedStats = await getStats();
        setStats(fetchedStats);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    // Only run after a game ends
    if (!gameResult) return;

    const saveGameAndRefreshStats = async () => {
      // Hard coded variables for this MVP setup as only ever two players
      // Assuming that a natural next step in the app is to allow users to choose their name
      const player1Id = 1;
      const player2Id = 2;

      try {
        await createGame({
          boardSize,
          playerOneId: player1Id,
          playerTwoId: player2Id,
          winnerId: gameResult === 'draw' ? null : gameResult === 'X' ? 1 : 2,
        });
      } catch (err) {
        console.error('Failed to create game:', err);
        return; 
      }

      try {
        const refreshedStats = await getStats();
        setStats(refreshedStats);
      } catch (err) {
        console.error('Failed to fetch stats after creating game:', err);
      }
    };

    saveGameAndRefreshStats();
  }, [gameResult]);

  const handleTurn = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex]) {
      return;
    }

    const newRow = [...board[rowIndex]];
    newRow[colIndex] = currentPlayer;

    const newBoard = [...board];
    newBoard[rowIndex] = newRow;

    setBoard(newBoard);

    const result = checkForWinnerOrDraw(rowIndex, colIndex, newBoard);
    if (result) {
      setGameResult(result);
    }
    setCurrentPlayer(prev => (prev === 'X' ? 'O' : 'X'));
  };

  const handleStartNewGame = () => {
    setBoard(createEmptyBoard(boardSize));
    setCurrentPlayer('X');
    setGameResult(null);
  };

  const handleChangeGridSize = (size: number) => {
    setBoardSize(size)
    handleStartNewGame()
  };

  return <div className='flex flex-col mt-10 items-center gap-5'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>
    <button className='flex items-center gap-3 border p-2' onClick={handleStartNewGame}>Start New Game</button>
    <div className='flex items-center gap-3'>
      <label htmlFor="boardSize" className='font-medium'>
        Board Size:
      </label>
      <input
        id="boardSize"
        type="number"
        min="3"
        max="15"
        value={boardSize}
        onChange={(e) => handleChangeGridSize(Number(e.target.value))}
        className="border text-center"
      />
      <span className='text-sm text-gray-500'>(3-15)</span>
    </div>
    <div className='flex gap-5'>
      <div className={`${currentPlayer === 'X' ? 'text-blue-500' : 'text-black'}`}>Player 1 (X)</div>
      <div className={`${currentPlayer === 'O' ? 'text-blue-500' : 'text-black'}`}>Player 2 (O)</div>
    </div>
    <div className='flex flex-col gap-1'>
      {board.map((row, rowIndex) =>
        <div key={rowIndex} className='flex gap-1'>
          {row.map((column, colIndex) =>
            <button
              key={colIndex}
              onClick={() => handleTurn(rowIndex, colIndex)}
              className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex'
            >
              {column}
            </button>
          )}
        </div>
      )}
    </div>
    {gameResult && (
      <div className='font-bold text-xl'>
        {gameResult === 'draw' ? "It's a Draw!" : `Player ${gameResult} Wins!`}
      </div>
    )}
    <div className="mt-6 w-full max-w-md mb-5">
      {stats ? (
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-2 py-1">Player</th>
              <th className="border border-gray-300 px-2 py-1">Wins</th>
              <th className="border border-gray-300 px-2 py-1">Losses</th>
              <th className="border border-gray-300 px-2 py-1">Draws</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stats).map(([playerId, stat]) => (
              <tr key={playerId} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 px-2 py-1">Player {playerId}</td>
                <td className="border border-gray-300 px-2 py-1">{stat.wins}</td>
                <td className="border border-gray-300 px-2 py-1">{stat.losses}</td>
                <td className="border border-gray-300 px-2 py-1">{stat.draws}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Loading stats...</div>
      )}
    </div>
  </div>

}
