import React from 'react';
import Grid from './Grid';

const Game = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Eclipse Puzzle Game</h1>
      <Grid />
    </div>
  );
};

export default Game;
