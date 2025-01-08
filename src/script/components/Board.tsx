import React, { useMemo } from "react";
import Tile from "./Tile.tsx";

type BoardProps = {
  columns: number;
  handleTileClick: (index: number, rowIndex: number) => any;
  initalTilesArray: number[];
  tiles: number[][];
  tilesArrayWithoutGridArray: number[];
};

const Board = ({
  columns,
  handleTileClick,
  initalTilesArray,
  tiles,
  tilesArrayWithoutGridArray,
}: BoardProps) => {
  const correctPositions = useMemo(() => {
    return initalTilesArray.map((value, index) => ({
      value,
      index,
      isCorrect:
        tilesArrayWithoutGridArray[index] === value ||
        (value === 0 && tilesArrayWithoutGridArray[index] === 0),
    }));
  }, [initalTilesArray, tilesArrayWithoutGridArray]);

  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {tiles.map((row, rowIndex) =>
        row.map((value, index) => {
          const tileIndex = rowIndex * columns + index; // Calculate the index for correctPositions based on row and columns
          const correctPosition =
            correctPositions && correctPositions[tileIndex]; // Get the correct position for the tile

          return (
            <Tile
              handleTileClick={handleTileClick}
              index={index}
              isCorrect={correctPosition?.isCorrect}
              rowIndex={rowIndex}
              value={value}
            />
          );
        })
      )}
    </div>
  );
};

export default Board;
