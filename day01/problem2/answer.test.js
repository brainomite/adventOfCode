const expect = require("chai").expect;
const {
  findFirstNumericCharIndexAndVal,
  findLastNumericCharIndexAndVal,
  findFirstNumberWordIndexAndVal,
  findLastNumberWordIndexAndVal,
} = require("./answer");

describe("day1/problem2", () => {
  describe("findFirstNumericCharIndexAndVal", () => {
    it("should return the index and value of the first numeric char", () => {
      const input = "abc123";
      const expected = { index: 3, val: "1" };
      const actual = findFirstNumericCharIndexAndVal(input);
      expect(actual).to.deep.equal(expected);
    });

    it("should return the index and value of the first numeric char", () => {
      const input = "6tgsl";
      const expected = { index: 0, val: "6" };
      const actual = findFirstNumericCharIndexAndVal(input);
      expect(actual).to.deep.equal(expected);
    });
    it("should return the index and value of the first numeric char", () => {
      const input = "44kmn";
      const expected = { index: 0, val: "4" };
      const actual = findFirstNumericCharIndexAndVal(input);
      expect(actual).to.deep.equal(expected);
    });
  });
  describe("findLastNumericCharIndexAndVal", () => {
    it("should return the index and value of the last numeric char", () => {
      const input = "abc123";
      const expected = { index: 5, val: "3" };
      const actual = findLastNumericCharIndexAndVal(input);
      expect(actual).to.deep.equal(expected);
    });
    it("should return the index and value of the last numeric char", () => {
      const input = "44kmn";
      const expected = { index: 1, val: "4" };
      const actual = findLastNumericCharIndexAndVal(input);
      expect(actual).to.deep.equal(expected);
    });
  });
  describe("findFirstNumberWordIndexAndVal", () => {
    it("should return the index and value of the first number word", () => {
      const input = "abctwothree123";
      const expected = { index: 3, val: "2" };
      const actual = findFirstNumberWordIndexAndVal(input);
      expect(actual).to.deep.equal(expected);
    });
  });
  describe("findLastNumberWordIndexAndVal", () => {
    it("should return the index and value of the last number word", () => {
      const input = "two1nine";
      const expected = { index: 4, val: "9" };
      const actual = findLastNumberWordIndexAndVal(input);
      expect(actual).to.deep.equal(expected);
    });
  });
});
