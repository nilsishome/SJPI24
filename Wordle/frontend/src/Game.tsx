import React, { JSX, useState, useEffect, FormEventHandler } from "react";

import GuessesList from "./components/GuessesList";
import GameBoard from "./components/GameBoard";
import GameInput from "./components/GameInput";
import {
  makeGuess,
  getEvaluation,
  handleSubmit,
} from "./components/inputActions";
import "./components/Modal.css";

type Props = {
  gameId: string;
  wordLength: number;
};

const Game: React.FC<Props> = ({ gameId, wordLength }): JSX.Element => {
  const [currentLetters, setCurrentLetters] = useState<string[]>(
    Array(wordLength).fill("")
  );
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [highscoreSubmit, setHighscoreSubmit] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(0);
  const [guesses, setGuesses] = useState<string[][]>([]);
  const [stateColors, setStateColors] = useState<string[][]>([]);
  const [result, setResult] = useState<{
    id: string;
    wordLength: number;
    allowRepetition: boolean;
    answer: string | undefined;
    guesses: string[];
    evaluation: { letter: string; result: string }[][];
    startTime: Date;
    endTime: Date;
  }>();
  const [name, setName] = useState<string>("");

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

        if (answer.correct) {
          setResult(answer.result);
          setGameOver(true); // Ends game
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
  }, [currentLetters]);

  if (!highscoreSubmit && gameOver && result) {
    const startTime = new Date(result.startTime);
    const endTime = new Date(result.endTime);
    const duration: number = (endTime.getTime() - startTime.getTime()) / 1000;
    return (
      <div className="modalBlur">
        <div className="modalContainer">
          <div className="modalTitle">
            <h1>Winner!</h1>
          </div>
          <div className="modalBody">
            <p>
              The correct answer was: {guesses.at(-1)?.join("").toUpperCase()}
            </p>
            <p>Number of guesses: {guesses.length}</p>
            <p>Duration: {duration}s</p>

            <div className="modalFooter">
              <h2>Add to highscore</h2>
              <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
                  event.preventDefault();
                  handleSubmit(gameId, name);
                  setHighscoreSubmit(true);
                }}
              >
                <input
                  value={name}
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ): void => setName(event.target.value)}
                  placeholder="Enter your name..."
                  required
                />
                <button id="submitBtn">Submit Highscore</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (highscoreSubmit) {
    return (
      <div className="modalBlur">
        <div className="modalContainer">
          <div className="modalTitle">
            <h1 id="submittedTitle">Highscore Submitted!</h1>
          </div>
          <div className="modalFooter">
            <button onClick={() => (window.location.href = "/highscores")}>
              View Highscores
            </button>
            <button onClick={() => window.location.reload()}>Play Again</button>
          </div>
        </div>
      </div>
    );
  }

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
