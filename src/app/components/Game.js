import React from 'react';
import Grid from './Grid';

const HowToPlay = () => {
  return (
    <div className="mt-8 text-center">
      <h2 className="text-2xl font-semibold text-gray-800">HOW TO PLAY</h2>
      <ul className="list-disc list-inside mt-4 text-gray-700 text-left mx-auto">
        <li>Fill the grid so that each cell contains either a sun (☀️) or a moon (🌑).</li>
        <li>No more than 2 ☀️ or 🌑 may be next to each other, either vertically or horizontally.</li>
        <ul className="list-disc list-inside ml-4">
          <li>☀️☀️ (GOOD)</li>
          <li>☀️☀️☀️ (WRONG)</li>
        </ul>
        <li>Each row (and column) must contain the same number of 🌑 and ☀️.</li>
        <li>The number of solutions is more than or equal to 1</li>
        <li>Takes 1-5 minutes</li>
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="mt-8 text-center">
      <p className="text-gray-600 text-lg">Clone of LinkedIn Tango</p>
    </div>
  );
};

const Game = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Eclipse Puzzle Game</h1>
      <Grid />
      <HowToPlay />
      <Footer />
    </div>
  );
};

export default Game;
