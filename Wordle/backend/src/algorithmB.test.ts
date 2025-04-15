import { describe, it, expect } from "@jest/globals";
import wordSelection from "./algorithmB.js";

/*
    The game should be able to choose the word the user should guess.
    The parameters needed is:
     a. a list of words.
     b. a number for wished length.
     c. an indicator whether all letters are unique, or if they are allowed
     repetition.

    The word should be selected randomly, based on the parameters described above.
    
    The situation that occurs if an appropriate word doesn't exist, should be clear,
    and a fitting solution should apply.
*/

describe("wordSelection()", () => {
  it("returns a matching word from list", () => {
    const output = wordSelection(["hej", "hejsan", "hållas"], 6, true);

    expect(["hållas", "hejsan"]).toContain(output);
  });

  it("returns a matching word from list, and must contain unique letters", () => {
    const output = wordSelection(["hej", "hållas", "hejsan"], 3, false);

    expect(output).toEqual("hej");
  });

  it("does not find a word with unique letters, but has the correct length", () => {
    const output = wordSelection(["hej", "hållas", "vem"], 6, false);

    expect(output).toEqual("hållas");
  });

  it("does not find a word with the correct length, but has unique letters", () => {
    const output = wordSelection(["hej", "vem", "vad"], 6, false);

    expect(["hej", "vem", "vad"]).toContain(output);
  });
});
