export default function wordSelection(arr, wordLength, allowRepetition) {
    const randomWord = (item) => {
        return item[Math.floor(Math.random() * item.length)];
    };
    if (!wordLength && !allowRepetition) {
        return randomWord(arr);
    }
    const lengthArr = [];
    // If repetition with letters is allowed, pick words with specified length
    if (allowRepetition === true) {
        arr = arr.filter((word) => wordLength === word.length);
        return randomWord(arr);
    }
    // If all letters in a word should be unique, pick words with specified length
    else {
        arr.forEach((word) => {
            const letters = word.split("");
            if (wordLength === word.length) {
                if (new Set(letters).size === letters.length) {
                    lengthArr.push(word); // Unique letters
                }
                else {
                    console.error("DID NOT FIND A WORD WITH UNIQUE LETTERS!");
                    lengthArr.push(word);
                }
            }
        });
        // If no words with specified length are found, but has unique letters
        if (!lengthArr.length) {
            arr.forEach((word) => {
                const letters = word.split("");
                if (new Set(letters).size === letters.length) {
                    lengthArr.push(word); // Only unique letters
                }
            });
            console.error("DID NOT FIND A WORD WITH THE CORRECT LENGTH!");
        }
        return randomWord(lengthArr);
    }
}
