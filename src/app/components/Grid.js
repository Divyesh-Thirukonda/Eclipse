// components/Grid.js
"use client"
import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import { getPuzzleForDate } from '../utils/getPuzzleForDate';

const today = new Date();
const puzzleForToday = getPuzzleForDate(today);

console.log("Puzzle for today:", puzzleForToday);

const initialGrid = puzzleForToday;

const Grid = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [isSolved, setIsSolved] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeTaken, setTimeTaken] = useState(null);
  const [domainName] = useState("https://eclipse-one-opal.vercel.app/");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [buttonText, setButtonText] = useState('Copy Results to Clipboard');

  const handleToggle = (row, col) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      const currentValue = newGrid[row][col];

      // Cycle through null -> 0 -> 1 -> null
      if (currentValue === null) {
        newGrid[row][col] = 0;
      } else if (currentValue === 0) {
        newGrid[row][col] = 1;
      } else {
        newGrid[row][col] = null;
      }
      
      return newGrid;
    });
  };

  useEffect(() => {
    checkSolution();
  }, [grid]);

  const checkSolution = () => {
    const rowsValid = grid.every(row => checkArray(row));
    const colsValid = grid[0].map((_, colIdx) => checkArray(grid.map(row => row[colIdx])));

    if (rowsValid && colsValid.every(v => v)) {
      setTimeTaken((Date.now() - startTime) / 1000);
      setIsSolved(true);
    }
  };

  const checkArray = (arr) => {
    const onesCount = arr.filter(v => v === 1).length;
    const zerosCount = arr.filter(v => v === 0).length;
    if (onesCount !== 3 || zerosCount !== 3) return false;
    for (let i = 0; i < arr.length - 2; i++) {
      if (arr[i] === arr[i + 1] && arr[i] === arr[i + 2]) return false;
    }
    return true;
  };

  const handleCopy = () => {
    const message = `🌘I finished today's Eclipse in ${timeTaken} seconds!🌒\n🔥See if you can beat my time at ${domainName}`;
    navigator.clipboard.writeText(message).then(() => {
      setIsButtonClicked(true);
      setButtonText('Copied!');
    });
  };

  return (
    <div className="text-center">
      {isSolved ? (
        <div>
          <div className="text-green-500 text-xl">
            🎉 Congratulations! You solved it in {timeTaken} seconds!
          </div>
          <button 
            onClick={handleCopy} 
            className={`mt-4 px-4 py-2 rounded border-2 ${isButtonClicked ? 'bg-white text-black border-blue-500' : 'bg-blue-500 text-white border-blue-500'}`}
          >
            {buttonText}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-2 mx-auto my-4">
          {grid.map((row, rowIndex) =>
            row.map((tile, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                value={tile}
                fixed={initialGrid[rowIndex][colIndex] !== null}
                onToggle={() => handleToggle(rowIndex, colIndex)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Grid;
