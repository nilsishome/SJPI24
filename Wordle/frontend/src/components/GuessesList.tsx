import React, { JSX, useEffect, useRef } from "react";

type Props = {
  stateColors: string[][];
  guesses: string[][];
};

const GuessesList: React.FC<Props> = ({
  stateColors,
  guesses,
}): JSX.Element => {
  const bottomOfGuessList = useRef<HTMLDivElement>(null);

  // Automatic scrolling for previous guesses
  useEffect(() => {
    if (bottomOfGuessList.current) bottomOfGuessList.current.scrollIntoView();
  }, [guesses]);

  return (
    <ul id="guessList">
      {guesses.map(
        (_, rowIndex: number): JSX.Element => (
          <div key={rowIndex} id="previousGuess">
            {guesses[rowIndex].map(
              (guessLetter: string, letterIndex: number): JSX.Element => (
                <div key={letterIndex}>
                  <input
                    className={`allGuesses ${stateColors[rowIndex][letterIndex]}`}
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
      <div ref={bottomOfGuessList}></div>
    </ul>
  );
};

export default GuessesList;
