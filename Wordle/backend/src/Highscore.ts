import mongoose from "mongoose";

const highscoreSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  time: Number,
  guesses: [String],
  wordLength: Number,
  uniqueLetters: String,
});

export const Highscore = mongoose.model("Highscore", highscoreSchema);
