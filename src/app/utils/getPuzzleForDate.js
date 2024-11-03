// utils/getPuzzleForDate.js
import puzzles from './eclipsePuzzles.json';

const baseDate = new Date('2024-11-03');

export const getPuzzleForDate = (date) => {
  const daysSinceBase = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
  const puzzleIndex = daysSinceBase % 100;
  return puzzles[puzzleIndex];
};
