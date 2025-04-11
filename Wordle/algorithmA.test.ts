import { describe, it, expect } from "@jest/globals";
import feedback from "./algorithmA";

/*
    Två olika inputs (text-strängar) ska jämföras med varandra.
    Ena text-strängen ska vara en gissning, och den andra ska vara ett korrekt svar.

    Funktionaliteten ska berätta om:
        a. text-strängarna är identiska
        b. text-strängarna inte är identiska
    
    Det ska skrivas ut en array med objekt - ett för varje bokstav - i samma
    ordning som de förekommer i det gissade ordet med följande attribut:
        1. letter (bokstaven)
        2. result (ett av följande värden)
            2a. 'incorrect' (finns inte med i den andra text-strängen)
            2b. 'misplaced' (finns med i den andra text-stängen men är felplacerad)
            2c. 'correct' (korrekt placerad i den andra text-strängen)

    Om en bokstav förekommer färre gånger i svaret, än i det gissade ordet; ska 
    resultatet bli 'incorrect' istället för 'misplaced'.
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
});
