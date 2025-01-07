import React, { useState, useEffect } from "react";
import data from "./config/data";
import { shuffleTiles, isPuzzleSolved } from "./utils/utils.tsx";
import Board from "./script/components/Board.tsx";
import Controls from "./script/components/Controls.tsx";
import Message from "./script/components/Message.tsx";

const { columns, newGameText, restartText, rows, successText, title } = data;

const App = () => {
  const [tiles, setTiles] = useState<number[][]>();
  const [isSolved, setIsSolved] = useState<boolean>(false);

  useEffect(() => {
    handleSetTiles(); // Set default array
  }, []);

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
      const newTiles = tiles ? tiles.map((row) => [...row]) : []; // Create a copy of the current array
      newTiles[zeroRow][zeroCol] = value; // Change tiles position
      newTiles[clickedRow][clickedCol] = 0;

      setTiles(newTiles);
    }

	//TODO: Add function for correct position 

    // 	TODO:
    // 	isPuzzleSolved(tiles);
  };

  const findZeroPosition = (value: number) => {
    if (tiles) {
      const position = tiles
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

    setTiles(shuffleTiles(values, rows, columns)); // Suffle array, sort and split into different arrays based on config data
  };

  const resetGame = () => {
    if (isSolved) setIsSolved(false);

    handleSetTiles();
  };

  return (
    <div className="puzzle">
      <h1 className="puzzle__title">{title}</h1>
      <Board
        tiles={tiles || []}
        handleTileClick={handleTileClick}
        columns={columns}
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
