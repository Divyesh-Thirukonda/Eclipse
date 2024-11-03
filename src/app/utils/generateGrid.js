// utils/generateGrid.js

const isValidPlacement = (grid, row, col, value) => {
  console.log(`Checking if placing ${value} at (${row}, ${col}) is valid`);

  const rowValues = grid[row];
  const colValues = grid.map((r) => r[col]);

  const rowCount = rowValues.filter((v) => v === value).length;
  const colCount = colValues.filter((v) => v === value).length;
  if (rowCount >= 3 || colCount >= 3) {
    console.log(`Invalid: Too many ${value}'s in row or column`);
    return false;
  }

  // Check for consecutive 1's or 0's
  if (col > 1 && rowValues[col - 1] === value && rowValues[col - 2] === value) {
    console.log(`Invalid: Three consecutive ${value}'s in row`);
    return false;
  }
  if (col < 5 && rowValues[col + 1] === value && rowValues[col + 2] === value) {
    console.log(`Invalid: Three consecutive ${value}'s in row (look-ahead)`);
    return false;
  }
  if (row > 1 && colValues[row - 1] === value && colValues[row - 2] === value) {
    console.log(`Invalid: Three consecutive ${value}'s in column`);
    return false;
  }
  if (row < 5 && colValues[row + 1] === value && colValues[row + 2] === value) {
    console.log(`Invalid: Three consecutive ${value}'s in column (look-ahead)`);
    return false;
  }

  console.log(`Valid placement of ${value} at (${row}, ${col})`);
  return true;
};

// Recursive function to fill the grid
const fillGrid = (grid, row = 0, col = 0) => {
  console.log(`fillGrid called for (${row}, ${col})`);

  if (row === 6) {
    console.log("Completed grid:");
    console.table(grid);
    return true;
  }

  if (col === 6) return fillGrid(grid, row + 1, 0);

  if (grid[row][col] !== null) {
    console.log(`Skipping preset value at (${row}, ${col})`);
    return fillGrid(grid, row, col + 1);
  }

  for (const value of [1, 0]) {
    if (isValidPlacement(grid, row, col, value)) {
      grid[row][col] = value;
      console.log(`Placed ${value} at (${row}, ${col})`);
      if (fillGrid(grid, row, col + 1)) return true;
      
      // Backtrack
      console.log(`Backtracking at (${row}, ${col})`);
      grid[row][col] = null;
    }
  }

  console.log(`No valid placements found at (${row}, ${col}), backtracking`);
  return false;
};

// Generate a grid with some preset values
const generateCompleteGrid = () => {
  const grid = Array(6).fill(null).map(() => Array(6).fill(null));

  // Initial preset values
  grid[0][0] = 1;
  grid[1][3] = 0;
  grid[3][1] = 1;

  console.log("Initial grid with preset values:");
  console.table(grid);

  if (fillGrid(grid)) {
    console.log("Successfully generated a complete grid:");
    console.table(grid);
    return grid;
  } else {
    console.log("Failed to generate a valid grid.");
    throw new Error("Grid generation failed.");
  }
};

// Remove values to create the puzzle for the user
const createPuzzleGrid = (completeGrid, tilesToRemove = 10) => {
  const puzzleGrid = completeGrid.map((row) => [...row]);
  let removed = 0;

  while (removed < tilesToRemove) {
    const row = Math.floor(Math.random() * 6);
    const col = Math.floor(Math.random() * 6);
    if (puzzleGrid[row][col] !== null) {
      puzzleGrid[row][col] = null;
      removed++;
      console.log(`Removed value at (${row}, ${col})`);
    }
  }

  console.log("Puzzle grid with some values removed:");
  console.table(puzzleGrid);
  return puzzleGrid;
};

// Exported function to initialize the grid
export const initializeGrid = (tilesToRemove = 10) => {
    console.log("UH");;
  const completeGrid = generateCompleteGrid();
  return createPuzzleGrid(completeGrid, tilesToRemove);
};



// [
// [null, null, null, null, null, null],
// [null, null, null, null, null, null],
// [null, null, null, null, null, null],
// [null, null, null, null, null, null],
// [null, null, null, null, null, null],
// [null, null, null, null, null, null],
// ]