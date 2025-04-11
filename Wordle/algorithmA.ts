export default function feedback(guess: string, answer: string) {
  const RESULT: string[] = ["correct", "misplaced", "incorrect"];
  const array: { letter: string; result: string }[] = [];
  const guessChars: string[] = guess.split("");
  const answerChars: string[] = answer.split("");

  for (let i = 0; i < guessChars.length; i++) {
    let resultValue: string;

    if (guessChars[i] === answerChars[i]) {
      resultValue = RESULT[0];
      answerChars.splice(i, 1, "");
    } else if (answerChars.includes(guessChars[i])) {
      resultValue = RESULT[1];
    } else {
      resultValue = RESULT[2];
    }

    array.push({
      letter: guessChars[i],
      result: resultValue,
    });
  }

  return array;
}
