import mongoose from "mongoose";

const highscoreSchema = new mongoose.Schema({
  name: String,
  time: Number,
  guesses: [String],
  wordLength: Number,
  allowRepetition: Boolean,
});

export const Highscore = mongoose.model("Highscore", highscoreSchema);
