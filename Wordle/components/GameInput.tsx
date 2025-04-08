import React, { JSX, useState, useEffect } from "react";

type Props = {
  letterBoxes: string[];
  currentLetters: string[][];
};

const GameInput: React.FC<Props> = ({
  letterBoxes,
  currentLetters,
}): JSX.Element => {
  return (
    <div>
      {currentLetters.map(
        (_, guessIndex: number): JSX.Element => (
          <div key={guessIndex}>
            {letterBoxes.map(
              (_, letterIndex: number): JSX.Element => (
                <input
                  key={letterIndex}
                  className="letterBoxes"
                  type="text"
                  value={currentLetters[guessIndex][letterIndex]}
                  readOnly
                />
              )
            )}
          </div>
        )
      )}
    </div>
  );
};

export default GameInput;
