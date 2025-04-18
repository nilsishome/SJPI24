import React, { JSX } from "react";

type Props = {
  feedback: string[][];
  guesses: string[][];
};

const GuessesList: React.FC<Props> = ({ feedback, guesses }): JSX.Element => {
  return (
    <ul id="guessList">
      {guesses.map(
        (_, rowIndex: number): JSX.Element => (
          <div key={rowIndex} id="previousGuess">
            {guesses[rowIndex].map(
              (guessLetter: string, letterIndex: number): JSX.Element => (
                <div key={letterIndex}>
                  <input
                    className={`allGuesses ${feedback[rowIndex][letterIndex]}`}
                    type="text"
                    value={guessLetter}
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
