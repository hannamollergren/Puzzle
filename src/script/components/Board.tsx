import React from "react";
import Tile from "./Tile.tsx";

interface BoardProps {
  tiles: number[][];
  handleTileClick: (index: number, value: number, rowIndex: number) => any;
  columns: number;
}

const Board = ({ tiles, handleTileClick, columns }: BoardProps) => {
  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {tiles.map((row, rowIndex) =>
        row.map((value, index) => (
          <Tile
            index={index}
            handleTileClick={handleTileClick}
            value={value}
            rowIndex={rowIndex}
          />
        ))
      )}
    </div>
  );
};

export default Board;
