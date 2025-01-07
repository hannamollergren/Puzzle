import React from "react";

type TileProps = {
  index: number;
  value: number;
  handleTileClick: (index: number, value: number, rowIndex: number) => any;
  rowIndex: number;
}

const Tile = ({ index, value, handleTileClick, rowIndex }: TileProps) => {
  return (
    <div
      className="board__tile"
      key={value}
      onClick={() => handleTileClick(index, value, rowIndex)}
    >
      {value !== 0 ? value : ""}
    </div>
  );
};

export default Tile;
