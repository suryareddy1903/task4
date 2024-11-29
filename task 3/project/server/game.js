import { v4 as uuidv4 } from 'uuid';

export class GameRoom {
  constructor() {
    this.players = new Map();
    this.cards = this.generateCards();
    this.currentTurn = null;
    this.status = 'waiting';
    this.flippedCards = [];
  }

  generateCards() {
    const values = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎯'];
    const cards = [...values, ...values].map(value => ({
      id: uuidv4(),
      value,
      isFlipped: false,
      isMatched: false
    }));
    
    return this.shuffleCards(cards);
  }

  shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }

  addPlayer(playerId, playerName) {
    this.players.set(playerId, {
      id: playerId,
      name: playerName,
      score: 0,
      isReady: false
    });
  }

  setPlayerReady(playerId) {
    const player = this.players.get(playerId);
    if (player) {
      player.isReady = true;
      if (this.areAllPlayersReady()) {
        this.startGame();
      }
    }
  }

  areAllPlayersReady() {
    return Array.from(this.players.values()).every(player => player.isReady);
  }

  startGame() {
    this.status = 'playing';
    this.currentTurn = Array.from(this.players.keys())[0];
  }

  flipCard(cardId, playerId) {
    if (this.status !== 'playing' || this.currentTurn !== playerId) return false;

    const card = this.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return false;

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      if (this.flippedCards[0].value === this.flippedCards[1].value) {
        this.flippedCards.forEach(c => c.isMatched = true);
        const player = this.players.get(playerId);
        player.score += 1;
      } else {
        setTimeout(() => {
          this.flippedCards.forEach(c => c.isFlipped = false);
          this.flippedCards = [];
        }, 1000);
      }

      this.nextTurn();
    }

    return true;
  }

  nextTurn() {
    const playerIds = Array.from(this.players.keys());
    const currentIndex = playerIds.indexOf(this.currentTurn);
    this.currentTurn = playerIds[(currentIndex + 1) % playerIds.length];
  }

  getState() {
    return {
      players: Array.from(this.players.values()),
      cards: this.cards,
      currentTurn: this.currentTurn,
      status: this.status
    };
  }

  reset() {
    this.cards = this.generateCards();
    this.currentTurn = null;
    this.status = 'waiting';
    this.flippedCards = [];
    this.players.forEach(player => {
      player.score = 0;
      player.isReady = false;
    });
  }
}