import express from "express";
import fs from "fs/promises";
import * as uuid from "uuid";
import mongoose from "mongoose";

import { getRandomWord } from "./utils.js";
import feedback from "./logic/algorithmA.js";
import { Highscore } from "./Highscore.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.json());
app.use("/assets", express.static("../frontend/dist/assets"));

const GAMES: {
  id: string;
  wordLength: number;
  allowRepetition: boolean;
  answer: string | undefined;
  guesses: string[];
  evaluation: { letter: string; result: string }[][];
  startTime: Date;
  endTime: Date | undefined;
}[] = [];

app.get("/", async (req, res) => {
  const htmlBuf = await fs.readFile("../frontend/dist/index.html");
  const htmlFile = htmlBuf.toString();
  res.status(200).send(htmlFile);
});

app.get("/highscores", async (req, res) => {
  await mongoose.connect("mongodb://localhost:27017/highscores");

  const userData = await Highscore.find().sort({ time: 1 });
  const user = JSON.parse(JSON.stringify(userData));
  res.render("highscores", { user });
});

app.get("/about", async (req, res) => {
  const htmlBuf = await fs.readFile("../frontend/dist/about.html");
  const htmlFile = htmlBuf.toString();
  res.status(200).send(htmlFile);
});

app.post("/api/games", async (req, res) => {
  const wordLength: number = req.body.wordLength;
  const allowRepetition: boolean = req.body.allowRepetition;

  const game = {
    id: uuid.v4(),
    wordLength: wordLength,
    allowRepetition: allowRepetition,
    answer: await getRandomWord(wordLength, allowRepetition),
    guesses: [],
    evaluation: [],
    startTime: new Date(),
    endTime: undefined,
  };

  GAMES.push(game);

  res.status(201).json({ id: game.id, wordLength: game.wordLength });
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

app.post("/api/games/:id/highscores", async (req, res) => {
  await mongoose.connect("mongodb://localhost:27017/highscores");
  const game = GAMES.find((session) => session.id === req.params.id);

  if (game && game.endTime) {
    let uniqueLetters: string;
    if (game.allowRepetition) uniqueLetters = "No";
    else uniqueLetters = "Yes";

    const newHighscore = new Highscore({
      name: req.body.name,
      time: (game.endTime.getTime() - game.startTime.getTime()) / 1000,
      guesses: game.guesses,
      wordLength: game.wordLength,
      uniqueLetters: uniqueLetters,
    });

    await newHighscore.save();

    res.status(201).json({ data: newHighscore });

    GAMES.splice(GAMES.indexOf(game), 1); // Remove game from server array
  } else {
    res.status(404).end();
  }
});

export default app;
