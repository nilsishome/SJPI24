import React, { JSX, useEffect } from "react";
import GameBoard from "../components/GameBoard";

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
  return (
    <main className="App">
      <h1 id="title">Wordle</h1>
      <section id="boardWrapper">
        <GameBoard />
      </section>
    </main>
  );
};

export default App;
