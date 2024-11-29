import { create } from 'zustand';
import { GameState } from '../types/game';
import { socket } from '../services/socket';

interface GameStore extends GameState {
  joinGame: (playerName: string) => void;
  setReady: () => void;
  flipCard: (cardId: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  players: [],
  cards: [],
  currentTurn: null,
  status: 'waiting',

  joinGame: (playerName) => {
    socket.emit('joinGame', { playerName });
  },

  setReady: () => {
    socket.emit('playerReady');
  },

  flipCard: (cardId) => {
    socket.emit('flipCard', { cardId });
  },

  resetGame: () => {
    socket.emit('resetGame');
  }
}));