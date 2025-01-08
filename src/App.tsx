import React, { useState, useEffect } from "react";
import data from "./config/data";
import Board from "./script/components/Board.tsx";
import Controls from "./script/components/Controls.tsx";
import Message from "./script/components/Message.tsx";

const { columns, newGameText, restartText, rows, successText, title } = data;

const App = () => {
  const [initalTilesArray, setInitalTilesArray] = useState<number[]>();
  const [tilesArrayWithoutGridArray, setTilesWithoutGridArray] =
    useState<number[]>();
  const [tilesArray, setTilesArray] = useState<number[][]>();
  const [isSolved, setIsSolved] = useState<boolean>(false);

  useEffect(() => {
    handleSetTiles(); // Set default array
  }, []);

  const isPuzzleSolved = (inital, current) => {
    const compare = JSON.stringify(inital) === JSON.stringify(current);

    compare && setIsSolved(true);
  };

  const handleTileClick = (index: number, value: number, rowIndex: number) => {
    if (isSolved) return;
    const clickedPosition = { clickedRow: rowIndex, clickedCol: index };
    const zeroPosition = findZeroPosition(0);

    if (!clickedPosition || !zeroPosition) {
      return; // No position is found
    }

    const { clickedRow, clickedCol } = clickedPosition;
    const { rowIndex: zeroRow, colIndex: zeroCol } = zeroPosition;

    const isSameRow =
      clickedRow === zeroRow && Math.abs(clickedCol - zeroCol) === 1;
    const isSameColumn =
      clickedCol === zeroCol && Math.abs(clickedRow - zeroRow) === 1;

    if (isSameRow || isSameColumn) {
      const newTiles = tilesArray ? tilesArray.map((row) => [...row]) : []; // Create a copy of the current array

      newTiles[zeroRow][zeroCol] = value; // Change tiles position
      newTiles[clickedRow][clickedCol] = 0;

      let copy = [...newTiles];
      let tilesWithoutGrid: any = [];

      copy.forEach((row) =>
        row.forEach((element) => tilesWithoutGrid.push(element))
      ); // Add all element into a array without grid

      // Check if inital array is same as current array
      isPuzzleSolved(initalTilesArray, tilesWithoutGrid);

      setTilesWithoutGridArray(tilesWithoutGrid); // Set tiles array with out grid to be able to compare with the inital array
      setTilesArray(newTiles);
    }

    //TODO: Be able to move all tiles in same row if possible

    // TODO: Correct error message of unique child key in tile.tsx

    // TODO: Responsive behavior if many columns
  };

  const findZeroPosition = (value: number) => {
    if (tilesArray) {
      const position = tilesArray
        .map((row, rowIndex) => ({
          rowIndex,
          colIndex: row.indexOf(value),
        }))
        .find(({ colIndex }) => colIndex !== -1);

      return position
        ? { rowIndex: position.rowIndex, colIndex: position.colIndex }
        : null;
    }

    return null;
  };

  const handleSetTiles = () => {
    const values = Array.from({ length: rows * columns - 1 }, (_, i) => i + 1); // Creates an array from config data
    values.push(0); //  Adding the empty tile

    const copy = [...values];

    setInitalTilesArray(copy); // Set inital array to be able to compare with the current array
    handleSetTilesArray(values);
  };

  const handleSetTilesArray = (values) => {
    values.sort(() => Math.random() - 0.5); // Shuffle array

    setTilesWithoutGridArray(values); // Set tiles array with out grid to be able to compare with the inital array

    // Spliting value into different arrays based on value of rows prop
    const tiles: number[][] = Array.from({ length: rows }, (_, rowIndex) =>
      values.slice(rowIndex * columns, rowIndex * columns + columns)
    );

    setTilesArray(tiles);
  };

  const resetGame = () => {
    if (isSolved) setIsSolved(false);

    handleSetTiles();
  };

  return (
    <div className="puzzle">
      <h1 className="puzzle__title">{title}</h1>
      <Board
        columns={columns}
        handleTileClick={handleTileClick}
        initalTilesArray={initalTilesArray || []}
        tiles={tilesArray || []}
        tilesArrayWithoutGridArray={tilesArrayWithoutGridArray || []}
      />
      <Controls
        resetGame={resetGame}
        restartText={isSolved ? newGameText : restartText}
      />
      {isSolved && <Message successText={successText} />}
    </div>
  );
};

export default App;
