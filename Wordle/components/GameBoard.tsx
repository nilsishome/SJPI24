import React, { JSX, MouseEventHandler } from "react";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const GameBoard: React.FC<Props> = ({ onClick }): JSX.Element => {
  const KEYS1: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const KEYS2: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const KEYS3: string[] = [
    "Enter",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "Backspace",
  ];

  return (
    <>
      <div>
        {KEYS1.map(
          (_, index: number): JSX.Element => (
            <button
              key={index}
              id={`ID1${index}`}
              className="keyboard"
              onClick={onClick}
            >
              {KEYS1[index]}
            </button>
          )
        )}
      </div>
      <div>
        {KEYS2.map(
          (_, index: number): JSX.Element => (
            <button
              key={index}
              id={`ID2${index}`}
              className="keyboard"
              onClick={onClick}
            >
              {KEYS2[index]}
            </button>
          )
        )}
      </div>
      <div>
        {KEYS3.map(
          (_, index: number): JSX.Element => (
            <button
              key={index}
              id={`ID3${index}`}
              className="keyboard"
              onClick={onClick}
            >
              {KEYS3[index]}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default GameBoard;
