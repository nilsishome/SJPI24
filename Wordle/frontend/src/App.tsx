import React, { JSX, useState, useRef } from "react";

import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import Game from "./Game";

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
 *  Step 1: is to create the game itself! [x]
 *    1a. Implement functionality and most of the GUI [x]
 *    1b. Import the randomized answer from our backend [x]
 *    1c. Create a modal that customizes the game to server [x]
 *    1d. Create a endscreen that lets the user send name and score to database [x]
 *    1e. Send highscore to database [x]
 *    1f. Serve the entire game from the same server [x]
 *
 *  Step 2: is to create the server-side rendered highscore page! [x]
 *
 *  Step 3: is to create the static, about page! [x]
 *
 *  Step 4: is to implement navigation for the three different routes [x]
 */

const App: React.FC = (): JSX.Element => {
  const [openModal, setOpenModal] = useState<boolean>(true);
  const [gameId, setGameId] = useState<string>("");
  const [wordLength, setWordLength] = useState<number>(0);

  const wordLengthRef = useRef<HTMLSelectElement | null>(null);
  const allowRepetitionRef = useRef<HTMLSelectElement | null>(null);

  const startGame = async (): Promise<void> => {
    if (wordLengthRef.current && allowRepetitionRef.current) {
      try {
        const response = await fetch("/api/games", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wordLength: parseInt(wordLengthRef.current.value),
            allowRepetition: allowRepetitionRef.current.value === "true",
          }), // This data allows the user to customize their Wordle type game
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const payload = await response.json();
        setGameId(payload.id);
        setWordLength(payload.wordLength);
      } catch (error) {
        console.error("Error starting the game:", error);
      }
    }
  };

  return (
    <main className="App">
      <Navbar />
      {openModal && (
        <Modal
          wordLengthRef={wordLengthRef}
          allowRepetitionRef={allowRepetitionRef}
          startGame={startGame}
          closeModal={setOpenModal}
        />
      )}
      {wordLength > 0 && <Game gameId={gameId} wordLength={wordLength} />}
    </main>
  );
};

export default App;
