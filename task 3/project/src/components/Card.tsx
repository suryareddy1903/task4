import React from 'react';
import { Card as CardType } from '../types/game';
import { useGameStore } from '../store/gameStore';

interface CardProps {
  card: CardType;
  disabled: boolean;
}

export function Card({ card, disabled }: CardProps) {
  const flipCard = useGameStore(state => state.flipCard);

  const handleClick = () => {
    if (disabled || card.isFlipped || card.isMatched) return;
    flipCard(card.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        aspect-square rounded-lg cursor-pointer transition-all duration-300 transform
        ${card.isFlipped ? 'rotate-y-180' : ''}
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
      `}
    >
      <div className="relative w-full h-full">
        <div className={`absolute w-full h-full backface-hidden ${
          card.isFlipped ? 'hidden' : 'bg-blue-500'
        }`}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-2xl">?</span>
          </div>
        </div>
        <div className={`absolute w-full h-full backface-hidden ${
          card.isFlipped ? 'bg-white' : 'hidden'
        }`}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-2xl">{card.value}</span>
          </div>
        </div>
      </div>
    </div>
  );
}