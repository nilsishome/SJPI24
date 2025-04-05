function onType(
  emptyIndex: number,
  newLetters: string[][],
  currentGuessIndex: number,
  userInput: string
) {
  if (emptyIndex !== -1) {
    newLetters[currentGuessIndex][emptyIndex] = userInput.toLowerCase();
  } else {
    newLetters[currentGuessIndex][emptyIndex] = "";
  }
}

function onDelete(
  emptyIndex: number,
  newLetters: string[][],
  currentGuessIndex: number
) {
  if (emptyIndex === -1) {
    newLetters[currentGuessIndex][newLetters[currentGuessIndex].length - 1] =
      "";
  } else {
    newLetters[currentGuessIndex][emptyIndex - 1] = "";
  }
}

export { onType, onDelete };
