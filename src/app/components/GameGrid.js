"use client";

import { useState, useEffect } from 'react';

const initialBoard = [
  [null, null, null, 1, 0, null],
  [null, 0, null, null, null, 1],
  [null, null, 1, null, null, 0],
  [1, null, null, null, 0, null],
  [null, 1, null, 0, null, null],
  [0, null, null, null, null, null],
];

const adjacencyConstraints = [
    { row: 0, col: 1, type: '=', target: { row: 0, col: 2 } },
    { row: 1, col: 3, type: 'x', target: { row: 1, col: 4 } },
    { row: 2, col: 0, type: 'x', target: { row: 2, col: 1 } },
    { row: 3, col: 2, type: '=', target: { row: 3, col: 3 } },
    { row: 4, col: 4, type: 'x', target: { row: 4, col: 5 } },
    { row: 5, col: 0, type: '=', target: { row: 5, col: 1 } },
];
  

const GameGrid = () => {
  const [board, setBoard] = useState(initialBoard);
  const [startTime] = useState(Date.now());
  const [isSolved, setIsSolved] = useState(false);

  // Ensure component is only rendered on client side
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Toggle cell state
  const toggleCell = (row, col) => {
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(r => [...r]);
      newBoard[row][col] = newBoard[row][col] === 1 ? null : (newBoard[row][col] === 0 ? 1 : 0);
      return newBoard;
    });
  };

  // Get the constraint type for the specified location
  const getConstraint = (row, col) => {
    const constraint = adjacencyConstraints.find(({ row: r, col: c, target }) =>
      (r === row && c === col) || (target.row === row && target.col === col)
    );
    return constraint ? constraint.type : null;
  };

  // Validation function
  const validateBoard = () => {
    for (let i = 0; i < 6; i++) {
      const row = board[i];
      const col = board.map(r => r[i]);
      if (!validateLine(row) || !validateLine(col)) return false;
    }
    for (const { row, col, type, target } of adjacencyConstraints) {
      const cell1 = board[row][col];
      const cell2 = board[target.row][target.col];
      if (type === '=' && cell1 !== cell2) return false;
      if (type === 'x' && cell1 === cell2) return false;
    }
    return true;
  };

  const validateLine = (line) => {
    const ones = line.filter(x => x === 1).length;
    const zeros = line.filter(x => x === 0).length;
    if (ones !== 3 || zeros !== 3) return false;
    for (let i = 0; i < line.length - 2; i++) {
      if (line[i] === line[i + 1] && line[i] === line[i + 2]) return false;
    }
    return true;
  };

  useEffect(() => {
    if (validateBoard()) setIsSolved(true);
  }, [board]);

  if (!isClient) return null; // Only render on the client side

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Eclipse Game</h1>
      <div className="grid grid-rows-[repeat(11,_auto)] grid-cols-[repeat(11,_auto)] gap-2">
        {board.map((row, rowIndex) => (
          <>
            {row.map((cell, colIndex) => (
              <>
                {/* Cell */}
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                  className={`w-12 h-12 flex items-center justify-center border ${
                    cell === 1 ? 'bg-blue-500' : cell === 0 ? 'bg-red-500' : 'bg-gray-200'
                  } cursor-pointer`}
                >
                  {cell !== null ? cell : ''}
                </div>

                {/* Horizontal constraint */}
                {colIndex < row.length - 1 && (
                  <div className="w-4 h-12 flex items-center justify-center text-xl font-bold text-gray-700">
                    {getConstraint(rowIndex, colIndex) === '=' ? '=' : getConstraint(rowIndex, colIndex) === 'x' ? 'x' : ''}
                  </div>
                )}
              </>
            ))}
            {rowIndex < board.length - 1 && (
              <div className="col-span-full grid grid-cols-[repeat(6,_auto)] gap-2">
                {row.map((_, colIndex) => (
                  <div key={`constraint-${rowIndex}-${colIndex}`} className="w-12 h-4 flex items-center justify-center text-xl font-bold text-gray-700">
                    {getConstraint(rowIndex, colIndex) === '=' ? '=' : getConstraint(rowIndex, colIndex) === 'x' ? 'x' : ''}
                  </div>
                ))}
              </div>
            )}
          </>
        ))}
      </div>
      {isSolved && (
        <div className="mt-4 text-green-500 text-xl font-bold">
          Solved in {((Date.now() - startTime) / 1000).toFixed(1)} seconds!
        </div>
      )}
    </div>
  );
};

export default GameGrid;
