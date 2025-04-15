import { describe, it, expect } from "@jest/globals";
import feedback from "./algorithmA.js";

/*
    Two different inputs (strings of text) should be compared to each other.
    The first input is a guess made by the user, and the second one should be
    the correct answer.

    The functionality will tell if:
        a. the strings of text are identical
        b. the strings of text are not identical

    An array of objects will be printed - one for each letter - in the same order
    as they are portrayed in the guessed word, with following attributes:
        1. letter
        2. result
            2a. 'incorrect'
            2b. 'misplaced'
            2c. 'correct'
    
    The result should be 'incorrect' if a letter has fewer instances in the answer
    than in the guess. Otherwise the result will be 'misplaced'.
*/

describe("feedback()", () => {
  it("checks if guess and answer are equal", () => {
    const output = feedback("Rätt", "Rätt");
    expect(output).toEqual([
      {
        letter: "R",
        result: "correct",
      },
      {
        letter: "ä",
        result: "correct",
      },
      {
        letter: "t",
        result: "correct",
      },
      {
        letter: "t",
        result: "correct",
      },
    ]);
  });

  it("checks if guess and answer are inequal", () => {
    const output = feedback("Feel", "Rätt");
    expect(output).toEqual([
      {
        letter: "F",
        result: "incorrect",
      },
      {
        letter: "e",
        result: "incorrect",
      },
      {
        letter: "e",
        result: "incorrect",
      },
      {
        letter: "l",
        result: "incorrect",
      },
    ]);
  });

  it("returns an array with different result values", () => {
    const output = feedback("ord", "kod");
    expect(output).toEqual([
      {
        letter: "o",
        result: "misplaced",
      },
      {
        letter: "r",
        result: "incorrect",
      },
      {
        letter: "d",
        result: "correct",
      },
    ]);
  });

  it("checks if a letter has more instances in guess than answer", () => {
    const output = feedback("Rätt", "Räta");
    expect(output).toEqual([
      {
        letter: "R",
        result: "correct",
      },
      {
        letter: "ä",
        result: "correct",
      },
      {
        letter: "t",
        result: "correct",
      },
      {
        letter: "t",
        result: "incorrect",
      },
    ]);
  });
});
