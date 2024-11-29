import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';

export function GameControls() {
  const [playerName, setPlayerName] = useState('');
  const { gameStatus, joinGame, setReady, resetGame } = useGameStore();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    joinGame(playerName);
  };

  if (gameStatus === 'waiting') {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <form onSubmit={handleJoin} className="space-y-4">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Join Game
          </button>
          <button
            type="button"
            onClick={setReady}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Ready
          </button>
        </form>
      </div>
    );
  }

  return (
    <button
      onClick={resetGame}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Reset Game
    </button>
  );
}