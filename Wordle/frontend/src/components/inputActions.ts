function onType(emptyIndex: number, newLetters: string[], userInput: string) {
  if (emptyIndex !== -1) newLetters[emptyIndex] = userInput.toLowerCase();
  else newLetters[emptyIndex] = "";
}

function onDelete(emptyIndex: number, newLetters: string[]) {
  if (emptyIndex === -1) newLetters[newLetters.length - 1] = "";
  else newLetters[emptyIndex - 1] = "";
}

export { onType, onDelete };
