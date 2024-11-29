import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GameRoom } from './game.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const gameRoom = new GameRoom();

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  socket.on('joinGame', ({ playerName }) => {
    gameRoom.addPlayer(socket.id, playerName);
    io.emit('gameState', gameRoom.getState());
  });

  socket.on('playerReady', () => {
    gameRoom.setPlayerReady(socket.id);
    io.emit('gameState', gameRoom.getState());
  });

  socket.on('flipCard', ({ cardId }) => {
    if (gameRoom.flipCard(cardId, socket.id)) {
      io.emit('gameState', gameRoom.getState());
    }
  });

  socket.on('resetGame', () => {
    gameRoom.reset();
    io.emit('gameState', gameRoom.getState());
  });

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Game server running on port ${PORT}`);
});