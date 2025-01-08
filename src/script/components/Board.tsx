import React from "react";
import Tile from "./Tile.tsx";

type BoardProps = {
  columns: number;
  handleTileClick: (index: number, value: number, rowIndex: number) => any;
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
  const correctPositions = initalTilesArray.map(
    (value, index) => tilesArrayWithoutGridArray[index] === value
  );
  
  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {tiles.map((row, rowIndex) =>
        row.map((value, index) => (
          <Tile
            handleTileClick={handleTileClick}
            index={index}
            isCorrect={correctPositions[index]}
            rowIndex={rowIndex}
            value={value}
          />
        ))
      )}
    </div>
  );
};

export default Board;
