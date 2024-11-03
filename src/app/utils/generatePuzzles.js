// generatePuzzles.js
import { initializeGrid } from './generateGrid.js';
import fs from 'fs';

const generatePuzzles = (count = 100) => {
  const puzzles = [];
  for (let i = 0; i < count; i++) {
    const randomTiles = Math.floor(Math.random() * (28 - 20 + 1)) + 20; // Random number between 20 and 28
    const puzzle = initializeGrid(randomTiles); // Pass the random value as a parameter
    puzzles.push(puzzle);
  }
  return puzzles;
};

const puzzles = generatePuzzles();
fs.writeFileSync('eclipsePuzzles.json', JSON.stringify(puzzles, null, 2));
console.log("100 puzzles generated and stored in eclipsePuzzles.json");
