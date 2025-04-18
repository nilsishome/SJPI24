export default function feedback(guess: string, answer: string) {
  const RESULT: string[] = ["correct", "misplaced", "incorrect"];
  const array: { letter: string; result: string }[] = [];
  const guessChars: string[] = guess.split("");
  const answerChars: string[] = answer.split("");

  // Checks if a letter is correct or incorrect
  for (let i = 0; i < guessChars.length; i++) {
    let resultValue: string;

    if (guessChars[i] === answerChars[i]) {
      resultValue = RESULT[0];
      answerChars.splice(i, 1, "");
    } else {
      resultValue = RESULT[2];
    }

    array.push({
      letter: guessChars[i],
      result: resultValue,
    });
  }

  // Checks if a letter is misplaced
  for (let i = 0; i < guessChars.length; i++) {
    let resultValue: string;
    const letter = array[i].letter;

    if (array[i].result === RESULT[2] && answerChars.includes(letter)) {
      resultValue = RESULT[1];
      array[i].result = resultValue;
      answerChars.splice(answerChars.indexOf(letter), 1, "");
    }
  }

  return array;
}
