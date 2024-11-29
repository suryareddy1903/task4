export interface Player {
  id: string;
  name: string;
  score: number;
  isReady: boolean;
}

export interface Card {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  players: Player[];
  cards: Card[];
  currentTurn: string | null;
  status: 'waiting' | 'playing' | 'finished';
}