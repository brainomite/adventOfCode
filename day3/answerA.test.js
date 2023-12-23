const expect = require("chai").expect;
const { numberAndDetails, addSurroundingChars } = require("./answerA");

describe("day3/problemA", () => {
  describe("numberAndDetails", () => {
    it("should return the number and details of the number", () => {
      const rowArr = "467..114".split("");
      const rowNumber = 1;
      const expected = [
        { number: 467, length: 3, startIdx: 0, row: rowNumber },
        { number: 114, length: 3, startIdx: 5, row: rowNumber },
      ];
      const actual = numberAndDetails(rowArr, rowNumber);
      expect(actual).to.deep.equal(expected);
    });
  });
  describe("addSurroundingChars", () => {
    it("should add the surrounding chars to the number details when in upper left", () => {
      const arr = `467..114..
...*......`
        .split("\n")
        .map((row) => row.split(""));
      const numberDetails = {
        number: 467,
        length: 3,
        startIdx: 0,
        row: 0,
      };
      const expected = {
        number: 467,
        length: 3,
        startIdx: 0,
        row: 0,
        surroundingChars: [".", ".", ".", ".", "*"],
      };
      const actual = addSurroundingChars(arr, numberDetails);
      expect(actual).to.deep.equal(expected);
    });
    it.only("should add the surrounding chars to the number details when centered", () => {
      const arr = `abc*defghi
jk35lm633.
pqrstu#vwx`
        .split("\n")
        .map((row) => row.split(""));
      const numberDetails = {
        number: 35,
        length: 2,
        startIdx: 2,
        endIdx: 5,
        row: 1,
      };
      const expected = {
        number: 35,
        length: 2,
        startIdx: 2,
        endIdx: 5,
        row: 1,
        surroundingChars: ["b", "c", "*", "d", "k", "l", "q", "r", "s", "t"],
      };
      const actual = addSurroundingChars(arr, numberDetails);
      expect(actual).to.deep.equal(expected);
    });
    it("should add the surrounding chars to the number details when bottom left", () => {
      const arr = `abc
de*
fg3`
        .split("\n")
        .map((row) => row.split(""));
      const numberDetails = {
        number: 3,
        length: 1,
        startIdx: 2,
        row: 2,
      };
      const expected = {
        number: 3,
        length: 1,
        startIdx: 2,
        row: 2,
        surroundingChars: ["e", "*", "g"],
      };
      const actual = addSurroundingChars(arr, numberDetails);
      expect(actual).to.deep.equal(expected);
    });
  });
});
