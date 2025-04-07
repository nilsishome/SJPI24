import React, { JSX } from "react";

const GameBoard: React.FC = (): JSX.Element => {
  const KEYS1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const KEYS2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const KEYS3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"];

  return (
    <>
      <div>
        {KEYS1.map(
          (_, index: number): JSX.Element => (
            <button key={index} id={`ID1${index}`} className="keyboard">
              {KEYS1[index]}
            </button>
          )
        )}
      </div>
      <div>
        {KEYS2.map(
          (_, index: number): JSX.Element => (
            <button key={index} id={`ID2${index}`} className="keyboard">
              {KEYS2[index]}
            </button>
          )
        )}
      </div>
      <div>
        {KEYS3.map(
          (_, index: number): JSX.Element => (
            <button key={index} id={`ID3${index}`} className="keyboard">
              {KEYS3[index]}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default GameBoard;
