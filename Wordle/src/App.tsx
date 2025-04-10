import React, { JSX, useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import GameInput from "../components/GameInput";
import { onType, onDelete, onEnter } from "../components/inputActions";

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
 *    1a. Implement functionality and most of the GUI
 *    1b. Import the real word-library to our backend
 *    1c.
 */

const App: React.FC = (): JSX.Element => {
  const [currentLetters, setCurrentLetters] = useState<string[]>(
    Array(5).fill("")
  );
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleUserInput = (userInput: string): void => {
    const newLetters: string[] = [...currentLetters];
    const emptyIndex: number = newLetters.indexOf("");

    if (!gameOver) {
      if (userInput.match(/^[A-Za-z]$/)) {
        onType(emptyIndex, newLetters, userInput);
        setCurrentLetters(newLetters);
      } else if (userInput === "Backspace") {
        onDelete(emptyIndex, newLetters);
        setCurrentLetters(newLetters);
      } else if (userInput === "Enter") {
        onEnter(emptyIndex, newLetters);
        setCurrentLetters(newLetters);
      }
    }
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const letter = event.currentTarget.textContent;
    if (letter) handleUserInput(letter);
  };

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent): void =>
      handleUserInput(event.key);

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentLetters, gameOver]);

  return (
    <main className="App">
      <h1 id="title">Wordle</h1>
      <section id="boardWrapper">
        <GameInput currentLetters={currentLetters} />
      </section>
      <section id="keyWrapper">
        <GameBoard onClick={handleOnClick} />
      </section>
    </main>
  );
};

export default App;
