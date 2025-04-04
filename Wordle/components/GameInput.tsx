import React, { JSX, useState, useEffect } from "react";

const GameInput: React.FC = (): JSX.Element => {
  const [currentLetters, setcurrentLetters] = useState<string[]>(
    Array(5).fill("")
  );
  const letterBoxes: number[] = [...Array(5)];

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent): void => {
      const userInput: string = event.key;
      const newLetters: string[] = [...currentLetters];
      const emptyIndex: number = currentLetters.indexOf("");

      if (userInput.match(/^[A-Za-z]$/)) {
        if (currentLetters.some((letter: string) => letter === "")) {
          newLetters[emptyIndex] = emptyIndex !== -1 ? userInput : "";
          setcurrentLetters(newLetters);
        }
      } else if (userInput === "Backspace") {
        if (currentLetters.some((letter: string) => letter !== "")) {
          emptyIndex === -1
            ? (newLetters[currentLetters.length - 1] = "")
            : (newLetters[emptyIndex - 1] = "");
          setcurrentLetters(newLetters);
        }
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentLetters]);

  return (
    <div>
      {letterBoxes.map(
        (_, index: number): JSX.Element => (
          <input
            key={index}
            className="letterBoxes"
            type="text"
            value={currentLetters[index]}
            readOnly
          />
        )
      )}
    </div>
  );
};

export default GameInput;
