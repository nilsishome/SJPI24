import { describe, it, expect } from "@jest/globals";
import wordSelection from "./algorithmB";

/*
    Spelet ska kunna välja ut vilket ord som man ska gissa på.
    De parametrar som behövs är:
     a. en lista med ord.
     b. en siffra på önskad längd.
     c. en indikation på huruvida alla bokstäver är unika, eller om de får upprepas
     i ordet.
    
    Ordet ska slumpmässigt väljas ut, baserat på parametrarna ovan.

    Situationen som inträffar om ett passande ord inte existerar, ska framgå tydligt,
    och lämplig lösning ska därmed tillämpas.
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
