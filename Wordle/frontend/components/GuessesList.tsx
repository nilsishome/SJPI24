import React, { JSX } from "react";

type Props = {
  guesses: string[][];
};

const GuessesList: React.FC<Props> = ({ guesses }): JSX.Element => {
  return (
    <ul id="guessList">
      {guesses.map(
        (_, rowIndex: number): JSX.Element => (
          <div key={rowIndex} id="previousGuess">
            {guesses[rowIndex].map(
              (_, guessIndex: number): JSX.Element => (
                <div key={guessIndex}>
                  <input
                    className="allGuesses"
                    type="text"
                    value={guesses[rowIndex][guessIndex]}
                    readOnly
                  />
                </div>
              )
            )}
          </div>
        )
      )}
    </ul>
  );
};

export default GuessesList;
