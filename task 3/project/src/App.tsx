import React from 'react';
import { GameBoard } from './components/GameBoard';
import { PlayerList } from './components/PlayerList';
import { GameControls } from './components/GameControls';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Memory Match
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <PlayerList />
            <div className="mt-4">
              <GameControls />
            </div>
          </div>
          <div className="lg:col-span-3">
            <GameBoard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;