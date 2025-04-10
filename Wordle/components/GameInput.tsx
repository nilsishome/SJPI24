import React, { JSX } from "react";

type Props = {
  currentLetters: string[];
};

const GameInput: React.FC<Props> = ({ currentLetters }): JSX.Element => {
  return (
    <div>
      {currentLetters.map(
        (_, index: number): JSX.Element => (
          <input
            key={index}
            className="letterBoxes"
            type="text"
            value={currentLetters[index]}
            readOnly
          />
        )
      )}
    </div>
  );
};

export default GameInput;
