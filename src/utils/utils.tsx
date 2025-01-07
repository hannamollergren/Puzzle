export const shuffleTiles = (values: number[], rows: number, columns: number) => {
    // Shuffle array
    const shuffledValues = values.sort(() => Math.random() - 0.5);

    // Spliting value into different arrays based on value of rows prop
    const tiles: number[][] = Array.from({ length: rows }, (_, rowIndex) =>
    shuffledValues.slice(rowIndex * columns, rowIndex * columns + columns)
  );  

  return tiles;
};

// export const isPuzzleSolved = (tiles: number[]): boolean => {
//   // TODO: Fix function 
//   return tiles.every((tile, index) => tile === index + 1);
// };
