import React from 'react';
import { useGameStore } from '../store/gameStore';

export function PlayerList() {
  const { players, gameStatus } = useGameStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Players</h2>
      <div className="space-y-2">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{player.name}</span>
              {player.isReady && (
                <span className="text-green-500 text-sm">(Ready)</span>
              )}
            </div>
            <span className="font-bold">Score: {player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}