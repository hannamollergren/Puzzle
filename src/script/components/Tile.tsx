import React from "react";

interface TileProps {
  index: number;
  value: number;
  handleTileClick: (index: number, value: number, rowIndex: number) => any;
  rowIndex: number;
}

const Tile = ({ index, value, handleTileClick, rowIndex }: TileProps) => {
  console.log(value);
  return (
    <div
      className="board__tile"
      key={index}
      onClick={() => handleTileClick(index, value, rowIndex)}
    >
      {value !== 0 ? value : ""}
    </div>
  );
};

export default Tile;
