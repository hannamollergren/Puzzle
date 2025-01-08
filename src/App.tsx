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
      return;
    }

    const { clickedRow, clickedCol } = clickedPosition;
    const { rowIndex: zeroRow, colIndex: zeroCol } = zeroPosition;

    // Check if the clicked tile is in the same row or column as the empty space
    const isSameRow = clickedRow === zeroRow;
    const isSameColumn = clickedCol === zeroCol;

    const newTiles = tilesArray ? tilesArray.map((row) => [...row]) : [];

    if (isSameRow) {
      if (clickedCol < zeroCol) {
        // Shift tiles to the right
        for (let i = zeroCol; i > clickedCol; i--) {
          newTiles[clickedRow][i] = newTiles[clickedRow][i - 1];
        }
        newTiles[clickedRow][clickedCol] = 0; // Place empty space at the clicked position
      } else if (clickedCol > zeroCol) {
        // Shift tiles to the left
        for (let i = zeroCol; i < clickedCol; i++) {
          newTiles[clickedRow][i] = newTiles[clickedRow][i + 1];
        }
        newTiles[clickedRow][clickedCol] = 0;
      }
    }

    if (isSameColumn) {
      if (clickedRow < zeroRow) {
        // Shift tiles down
        for (let i = zeroRow; i > clickedRow; i--) {
          newTiles[i][clickedCol] = newTiles[i - 1][clickedCol];
        }
        newTiles[clickedRow][clickedCol] = 0;
      } else if (clickedRow > zeroRow) {
        // Shift tiles up
        for (let i = zeroRow; i < clickedRow; i++) {
          newTiles[i][clickedCol] = newTiles[i + 1][clickedCol];
        }
        newTiles[clickedRow][clickedCol] = 0;
      }
    }

    // Flatten the newTiles array to tilesWithoutGridArray
    let tilesWithoutGrid: any = [];
    newTiles.forEach((row) =>
      row.forEach((element) => tilesWithoutGrid.push(element))
    );

    // Check if the initial array is the same as the current array
    isPuzzleSolved(initalTilesArray, tilesWithoutGrid);

    setTilesWithoutGridArray(tilesWithoutGrid); // Set tiles array without grid to be able to compare with the initial array
    setTilesArray(newTiles); // Update the new tiles array after the move
  };

  // TODO: Correct error message of unique child key in tile.tsx

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

    setTilesWithoutGridArray(values); // Set tiles array without grid to be able to compare with the inital array

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
