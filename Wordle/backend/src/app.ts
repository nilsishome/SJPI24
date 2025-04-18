import express from "express";
import * as uuid from "uuid";

import { getRandomWord } from "./utils.js";
import feedback from "./logic/algorithmA.js";

const app = express();

app.use(express.json());

const GAMES: {
  id: string;
  answer: string | undefined;
  guesses: string[];
  evaluation: object[];
  startTime: Date;
  endTime: Date | undefined;
}[] = [];

app.post("/api/games", async (req, res) => {
  const game = {
    id: uuid.v4(),
    answer: await getRandomWord(5, true),
    guesses: [],
    evaluation: [],
    startTime: new Date(),
    endTime: undefined,
  };

  GAMES.push(game);

  res.status(201).json({ id: game.id });
});

app.post("/api/games/:id/guesses", (req, res) => {
  const game = GAMES.find((session) => session.id === req.params.id);

  if (game) {
    const answer = game.answer;
    if (answer) {
      const guess = req.body.guess;
      const evaluation = feedback(guess, answer);

      game.guesses.push(guess);
      game.evaluation.push(evaluation);

      if (guess === answer) {
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
    }
  } else {
    res.status(404).end();
  }
});

app.get("/api/games/:id/evaluation", (req, res) => {
  const game = GAMES.find((session) => session.id === req.params.id);

  if (game) {
    res.status(200).json({
      evaluation: game.evaluation,
    });
  } else {
    res.status(404).end();
  }
});

export default app;
