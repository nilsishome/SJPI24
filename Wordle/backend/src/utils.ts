import wordSelection from "./logic/algorithmB.js";

export const getRandomWord = async (
  length: number,
  allowRepetition: boolean
) => {
  const URL = "../words.json";
  const response = await import(URL, { with: { type: "json" } });

  if (!response) {
    console.error("ERROR");
  } else {
    const payload = await response;
    const data = JSON.parse(JSON.stringify(payload));
    const words = data.default.words;

    const randomWord = wordSelection(words, length, allowRepetition);

    return randomWord;
  }
};
