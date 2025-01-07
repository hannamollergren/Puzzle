import React from "react";

interface ControlsProps {
  resetGame: () => void;
  restartText: string;
}

const Controls = ({ resetGame, restartText }: ControlsProps) => {
  return (
    <>
      <button className="controls__button" onClick={resetGame}>
        {restartText}
      </button>
    </>
  );
};

export default Controls;
