// Danish bingo card generator
// Rules: 3x9 grid, 15 numbers total, 5 per row, numbers in columns follow ranges

export const generateCard = () => {
  // Initialize empty 3x9 grid
  const card = Array(3).fill(null).map(() => Array(9).fill(null));
  
  // Column ranges for Danish bingo
  const columnRanges = [
    { min: 1, max: 9 },    // Column 0
    { min: 10, max: 19 },  // Column 1
    { min: 20, max: 29 },  // Column 2
    { min: 30, max: 39 },  // Column 3
    { min: 40, max: 49 },  // Column 4
    { min: 50, max: 59 },  // Column 5
    { min: 60, max: 69 },  // Column 6
    { min: 70, max: 79 },  // Column 7
    { min: 80, max: 90 },  // Column 8 (includes 90)
  ];
  
  // Track which columns have numbers in each row
  const columnsPerRow = [[], [], []];
  
  // First, ensure each row will have exactly 5 numbers
  // Randomly distribute 15 numbers across rows (5 per row)
  for (let row = 0; row < 3; row++) {
    // Select 5 unique columns for this row
    const availableColumns = Array.from({ length: 9 }, (_, i) => i);
    
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * availableColumns.length);
      const column = availableColumns.splice(randomIndex, 1)[0];
      columnsPerRow[row].push(column);
    }
    
    columnsPerRow[row].sort((a, b) => a - b);
  }
  
  // Now place numbers according to the distribution
  const usedNumbers = new Set();
  
  // First, collect all numbers for each column
  for (let col = 0; col < 9; col++) {
    const rowsWithThisColumn = [];
    
    // Find which rows have this column
    for (let row = 0; row < 3; row++) {
      if (columnsPerRow[row].includes(col)) {
        rowsWithThisColumn.push(row);
      }
    }
    
    // Generate numbers for this column
    const numbersForColumn = [];
    const range = columnRanges[col];
    
    for (let i = 0; i < rowsWithThisColumn.length; i++) {
      let number;
      do {
        number = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
      } while (usedNumbers.has(number) || numbersForColumn.includes(number));
      
      numbersForColumn.push(number);
      usedNumbers.add(number);
    }
    
    // Sort the numbers in ascending order
    numbersForColumn.sort((a, b) => a - b);
    
    // Place sorted numbers in the rows (top to bottom)
    rowsWithThisColumn.forEach((row, index) => {
      card[row][col] = numbersForColumn[index];
    });
  }
  
  return card;
};

export const generateBatch = (count) => {
  const cards = [];
  const cardSet = new Set();
  
  while (cards.length < count) {
    const card = generateCard();
    const cardString = JSON.stringify(card);
    
    // Check for duplicates
    if (!cardSet.has(cardString)) {
      cardSet.add(cardString);
      cards.push(card);
    }
  }
  
  return cards;
};

export const validateCard = (card) => {
  if (!card || card.length !== 3) return false;
  
  let totalNumbers = 0;
  
  for (let row = 0; row < 3; row++) {
    if (!card[row] || card[row].length !== 9) return false;
    
    let rowNumbers = 0;
    for (let col = 0; col < 9; col++) {
      if (card[row][col] !== null) {
        rowNumbers++;
        totalNumbers++;
        
        // Check if number is in correct column range
        const range = getColumnRange(col);
        if (card[row][col] < range.min || card[row][col] > range.max) {
          return false;
        }
      }
    }
    
    // Each row must have exactly 5 numbers
    if (rowNumbers !== 5) return false;
  }
  
  // Total must be 15 numbers
  return totalNumbers === 15;
};

const getColumnRange = (col) => {
  const ranges = [
    { min: 1, max: 9 },
    { min: 10, max: 19 },
    { min: 20, max: 29 },
    { min: 30, max: 39 },
    { min: 40, max: 49 },
    { min: 50, max: 59 },
    { min: 60, max: 69 },
    { min: 70, max: 79 },
    { min: 80, max: 90 },
  ];
  return ranges[col];
};