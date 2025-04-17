import express from "express";
import * as uuid from "uuid";

import { getRandomWord } from "./utils.js";

const app = express();

app.use(express.json());

const GAMES: {
  id: string;
  answer: string | undefined;
  guesses: string[];
  startTime: Date;
  endTime: Date | undefined;
}[] = [];

app.post("/api/games", async (req, res) => {
  const game = {
    id: uuid.v4(),
    answer: await getRandomWord(5, true),
    guesses: [],
    startTime: new Date(),
    endTime: undefined,
  };

  GAMES.push(game);

  res.status(201).json({ id: game.id });
});

/* app.get("/api/games/:id/guesses", (req, res) => {
  const game = GAMES.find((session) => session.id === req.params.id);

  if (game) {
    res.status(200).json({
      game: game.answer,
    });
  } else {
    res.status(404).end();
  }
}); */

app.post("/api/games/:id/guesses", (req, res) => {
  const game = GAMES.find((session) => session.id === req.params.id);

  if (game) {
    const guess = req.body.guess;
    game.guesses.push(guess);

    if (guess === game.answer) {
      game.endTime = new Date();

      res.status(201).json({
        guesses: game.guesses,
        result: game,
        correct: true,
      });
    } else {
      res.status(201).json({
        guesses: game.guesses,
        correct: false,
      });
    }
  } else {
    res.status(404).end();
  }
});

export default app;
