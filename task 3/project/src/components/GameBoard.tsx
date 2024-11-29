import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Card } from './Card';

export function GameBoard() {
  const { cards, currentTurn } = useGameStore();
  const isMyTurn = currentTurn === socket.id;

  return (
    <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto p-4">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          disabled={!isMyTurn}
        />
      ))}
    </div>
  );
}