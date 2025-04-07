import React, { JSX, useState, useEffect } from "react";
import { onType, onDelete } from "../components/inputActions";

const GameInput: React.FC = (): JSX.Element => {
  const letterBoxes: string[] = Array(5).fill("");
  const [currentLetters, setCurrentLetters] = useState<string[][]>(
    Array(6).fill(letterBoxes)
  );
  const [currentGuessIndex, setCurrentGuessIndex] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent): void => {
      const newLetters: string[][] = currentLetters.map((row: string[]) => [
        ...row,
      ]);
      const userInput: string = event.key;
      const emptyIndex: number = newLetters[currentGuessIndex].indexOf("");

      if (!gameOver) {
        if (userInput.match(/^[A-Za-z]$/)) {
          onType(emptyIndex, newLetters, currentGuessIndex, userInput);
          setCurrentLetters(newLetters);
        } else if (userInput === "Backspace") {
          onDelete(emptyIndex, newLetters, currentGuessIndex);
          setCurrentLetters(newLetters);
        } else if (userInput === "Enter") {
          if (currentGuessIndex < currentLetters.length - 1) {
            if (emptyIndex === -1) setCurrentGuessIndex(currentGuessIndex + 1);
          } else setGameOver(true);
        }
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentLetters, currentGuessIndex, gameOver]);

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
