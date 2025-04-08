import React, { JSX, useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import GameInput from "../components/GameInput";
import { onType, onDelete } from "../components/inputActions";

/*
 *  The plan is to create a Wordle app; using React, TypeScript, server-side
 *  rendering (SSR), static info-page and serving all resources with NodeJS,
 *  probably with Express.
 *
 *  I will also create a database - for the first time in this education -
 *  containing high-scores. We will use MongoDB.
 *
 *  All functionality will be implemented with the help from TypeScript.
 *  The high-score page will be server-side rendered, either by Pug or EJS.
 *
 *  Step 1: is to create the game itself!
 *    1a. Implement functionality and GUI
 *    1b. Import the real word-library to our backend
 *    1c.
 *  Step 2: is to create the backend with the game- and API functionality
 */

const App: React.FC = (): JSX.Element => {
  const letterBoxes: string[] = Array(5).fill("");
  const [currentLetters, setCurrentLetters] = useState<string[][]>(
    Array(6).fill(letterBoxes)
  );
  const [currentGuessIndex, setCurrentGuessIndex] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleUserInput = (userInput: string): void => {
    const newLetters: string[][] = currentLetters.map((row: string[]) => [
      ...row,
    ]);
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

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const letter = event.currentTarget.textContent;
    if (letter) {
      handleUserInput(letter);
    }
  };

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent): void => {
      handleUserInput(event.key);
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentLetters, currentGuessIndex, gameOver]);

  return (
    <main className="App">
      <h1 id="title">Wordle</h1>
      <section id="boardWrapper">
        <GameInput letterBoxes={letterBoxes} currentLetters={currentLetters} />
      </section>
      <section id="keyWrapper">
        <GameBoard onClick={handleOnClick} />
      </section>
    </main>
  );
};

export default App;
