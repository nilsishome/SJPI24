import React, { JSX, useState, useEffect } from "react";
import GuessesList from "../components/GuessesList";
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
 *    1a. Implement functionality and most of the GUI
 *    1b. Serve the game with a custom created server
 *    1c. Import the real word-library to our backend
 */

const App: React.FC = (): JSX.Element => {
  const [currentLetters, setCurrentLetters] = useState<string[]>(
    Array(5).fill("")
  );
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(0);
  const [guesses, setGuesses] = useState<string[][]>(Array(rows));

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
      } else if (userInput === "Enter" && emptyIndex === -1) {
        const newGuess: string[][] = [...guesses];
        newGuess[rows] = [...newLetters];
        setGuesses(newGuess);
        setRows((prev: number) => prev + 1);
        newLetters.fill("");
        setCurrentLetters(newLetters); // Resets the typing area
      }
    }
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const letter = event.currentTarget.textContent;
    if (letter) handleUserInput(letter);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void =>
      handleUserInput(event.key);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentLetters, gameOver, rows, guesses]);

  return (
    <main className="App">
      <h1 id="title">Wordle</h1>
      <GuessesList guesses={guesses} />
      <div id="inputArea">
        <section id="boardWrapper">
          <GameInput currentLetters={currentLetters} />
        </section>
        <section id="keyWrapper">
          <GameBoard onClick={handleOnClick} />
        </section>
      </div>
    </main>
  );
};

export default App;
