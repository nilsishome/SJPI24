import React, { JSX, useState, useEffect } from "react";
import GameInput from "../components/GameInput";

const GameBoard: React.FC = (): JSX.Element => {
  const [totalGuesses, setTotalGuesses] = useState<string[]>([...Array(6)]);
  // How many totalGuesses the game contain

  return (
    <>
      <GameInput />
    </>
  );
};

export default GameBoard;
