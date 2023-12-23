// load a file
const fs = require("fs");
const input = fs.readFileSync("day1/problem2/input.txt", "utf8");

const numberWords = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const findFirstNumericCharIndexAndVal = (line) => {
  const index = line
    .split("")
    .findIndex((char) => Number.isInteger(Number(char)));
  const val = line[index];
  return { index, val };
};

const findLastNumericCharIndexAndVal = (line) => {
  const index = line
    .split("")
    .findLastIndex((char) => Number.isInteger(Number(char)));
  const val = line[index];
  return { index, val };
};

const findFirstNumberWordIndexAndVal = (line) => {
  return Object.keys(numberWords).reduce(
    (acc, numberWord) => {
      const index = line.indexOf(numberWord);
      if (index === -1) return acc
      return acc.index === -1 || (index < acc.index && index !== -1)
        ? { index, val: numberWords[numberWord] }
        : acc;
    },
    { index: -1 }
  );
};

const findLastNumberWordIndexAndVal = (line) => {
  return Object.keys(numberWords).reduce(
    (acc, numberWord) => {
      const index = line.lastIndexOf(numberWord);
      return index > acc.index
        ? { index, val: numberWords[numberWord] }
        : acc;
    },
    { index: -1 }
  );
};

const lines = input.split("\n");
const sum = lines.reduce((acc, line) => {
  if (line === "") return acc;
  const firstChar = (optionA, optionB) =>
    optionA.index === -1 || ((optionB.index < optionA.index) && optionB.index !== -1)
      ? optionB.val
      : optionA.val;
  const LastChar = (optionA, optionB) =>
    optionA.index > optionB.index ? optionA.val : optionB.val;
  const firstNumericChar = findFirstNumericCharIndexAndVal(line);
  const firstNumberWord = findFirstNumberWordIndexAndVal(line);
  const lastNumericChar = findLastNumericCharIndexAndVal(line);
  const lastNumberWord = findLastNumberWordIndexAndVal(line);
  const first = firstChar(firstNumericChar, firstNumberWord);
  const last = LastChar(lastNumericChar, lastNumberWord);
  const subAnswer = Number(first + last);
  return acc + subAnswer;
}, 0);

console.log(sum);

module.exports = {
  findFirstNumericCharIndexAndVal,
  findLastNumericCharIndexAndVal,
  findFirstNumberWordIndexAndVal,
  findLastNumberWordIndexAndVal,
};
