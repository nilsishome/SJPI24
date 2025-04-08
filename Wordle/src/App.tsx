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
 *  containing high-scores. We will probably use MongoDB.
 *
 *  All functionality will be implemented with the help from TypeScript.
 *  The high-score page will be server-side rendered, either by Pug or EJS.
 *
 *  Step 1: is to create the game itself!
 *    1a. Implement functionality and UI (using a template word-library for now)
 *    1b. Import the real word-library to our backend
 *    1c.
 */

const App: React.FC = (): JSX.Element => {
  const letterBoxes: string[] = Array(5).fill("");
  const [currentLetters, setCurrentLetters] = useState<string[][]>(
    Array(6).fill(letterBoxes)
  );
  const [currentGuessIndex, setCurrentGuessIndex] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  document.body.style = "background-color: #474747";

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
    <main className="App">
      <h1 id="title">Wordle</h1>
      <section id="boardWrapper">
        <GameInput letterBoxes={letterBoxes} currentLetters={currentLetters} />
      </section>
      <section id="keyWrapper">
        <GameBoard />
      </section>
    </main>
  );
};

export default App;
