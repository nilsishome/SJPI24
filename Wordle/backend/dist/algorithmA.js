export default function feedback(guess, answer) {
    const RESULT = ["correct", "misplaced", "incorrect"];
    const array = [];
    const guessChars = guess.split("");
    const answerChars = answer.split("");
    for (let i = 0; i < guessChars.length; i++) {
        let resultValue;
        if (guessChars[i] === answerChars[i]) {
            resultValue = RESULT[0];
            answerChars.splice(i, 1, "");
        }
        else if (answerChars.includes(guessChars[i])) {
            resultValue = RESULT[1];
        }
        else {
            resultValue = RESULT[2];
        }
        array.push({
            letter: guessChars[i],
            result: resultValue,
        });
    }
    return array;
}
