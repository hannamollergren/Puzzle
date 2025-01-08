import React from "react";

type TileProps = {
  handleTileClick: (index: number, value: number, rowIndex: number) => any;
  index: number;
  isCorrect: boolean;
  rowIndex: number;
  value: number;
};

const Tile = ({
  handleTileClick,
  index,
  isCorrect,
  rowIndex,
  value,
}: TileProps) => {
  return (
    <div
      className={`board__tile ${isCorrect ? "correct" : ""}`}
      key={value}
      onClick={() => handleTileClick(index, value, rowIndex)}
    >
      {value !== 0 ? value : ""}
    </div>
  );
};

export default Tile;
