import React, { JSX, useEffect, useState } from "react";
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
 *  Step 1: is to create the game itself!
 *    1a. Implement functionality and most of the GUI
 *    1b. Import the randomized answer from our backend
 *
 *  Step 2: is to create the server-side rendered highscore page!
 *
 *  Step 3: is to create the static about page!
 */

const App: React.FC = (): JSX.Element => {
  const [gameId, setGameId] = useState<string>("");

  useEffect(() => {
    const startGame = async (): Promise<void> => {
      const response = await fetch("/api/games", {
        method: "post",
      });
      const payload = await response.json();
      setGameId(payload.id);
    };

    startGame();
  }, []);

  return (
    <main className="App">
      <Game gameId={gameId} />
    </main>
  );
};

export default App;
