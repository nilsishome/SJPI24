import mongoose from "mongoose";

const highscoreSchema = new mongoose.Schema({
  name: String,
  time: Number,
  guesses: Number,
  wordLength: Number,
  uniqueLetters: String,
});

export const Highscore = mongoose.model("Highscore", highscoreSchema);
