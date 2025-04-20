import React, { JSX, useState, useEffect } from "react";

import GuessesList from "./components/GuessesList";
import GameBoard from "./components/GameBoard";
import GameInput from "./components/GameInput";
import { makeGuess, getEvaluation } from "./components/inputActions";

type Props = {
  gameId: string;
};

const Game: React.FC<Props> = ({ gameId }): JSX.Element => {
  const [currentLetters, setCurrentLetters] = useState<string[]>(
    Array(4).fill("")
  );
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(0);
  const [guesses, setGuesses] = useState<string[][]>(Array(rows));
  const [stateColors, setStateColors] = useState<string[][]>([]);

  // Input handling + game logic
  const handleUserInput = async (userInput: string): Promise<void> => {
    const newLetters: string[] = [...currentLetters];
    const newWord: string = newLetters.join("");
    const emptyIndex: number = newLetters.indexOf("");

    if (!gameOver) {
      if (userInput.match(/^[A-Za-z]$/)) {
        newLetters[emptyIndex] = userInput.toLowerCase();
        setCurrentLetters(newLetters);
      } else if (userInput === "Backspace") {
        if (emptyIndex === -1) newLetters[newLetters.length - 1] = "";
        else newLetters[emptyIndex - 1] = "";
        setCurrentLetters(newLetters);
      } else if (userInput === "Enter" && emptyIndex === -1) {
        try {
          // Posts a guess to server
          const answer = await makeGuess(gameId, newWord);

          // Sends data from API to change background color in guesses
          const evaluation = await getEvaluation(gameId, rows);
          const newStateColors: string[][] = stateColors;
          const results: string[] = [];
          for (let i = 0; i < evaluation.length; i++) {
            results.push(evaluation[i].result);
          }
          newStateColors[rows] = [...results];
          setStateColors(newStateColors);

          // Updates the previous-guessed-word list
          const newGuess: string[][] = [...guesses];
          newGuess[rows] = [...newLetters];
          setGuesses(newGuess);
          setRows((prev: number) => prev + 1);

          // Resets the 'text field'
          newLetters.fill("");
          setCurrentLetters(newLetters);

          if (answer.correct) setGameOver(true); // Ends game
        } catch (error) {
          console.error("Error posting guess:", error);
        }
      }
    }
  };

  // Handle virtual keyboard (button) input
  const handleOnClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    const letter = event.currentTarget.textContent;
    if (letter) handleUserInput(letter);
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent): Promise<void> =>
      handleUserInput(event.key);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentLetters, gameOver, rows, guesses]);

  return (
    <>
      <h1 id="title">Wordle</h1>
      <GuessesList stateColors={stateColors} guesses={guesses} />
      <div id="inputArea">
        <section id="boardWrapper">
          <GameInput currentLetters={currentLetters} />
        </section>
        <section id="keyWrapper">
          <GameBoard onClick={handleOnClick} />
        </section>
      </div>
    </>
  );
};

export default Game;
