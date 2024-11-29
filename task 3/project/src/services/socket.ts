import { io } from 'socket.io-client';
import { useGameStore } from '../store/gameStore';

const SOCKET_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001' 
  : `https://${window.location.hostname}`;

export const socket = io(SOCKET_URL);

socket.on('gameState', (gameState) => {
  const store = useGameStore.getState();
  store.setState(gameState);
});