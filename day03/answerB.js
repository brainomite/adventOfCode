const fs = require("fs");
const schematic = fs.readFileSync("day3/inputDay3.txt", "utf8").split("\n");
// schematic.pop(); // remove empty line at end of file

const SURROUNDING_MATRIX = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const numberAndDetails = (arr, row) => {
  let inNumber = false;
  let number = "";
  const numbers = [];
  let startIdx = 0;
  for (charIdx in arr) {
    if (Number.isInteger(Number(arr[charIdx]))) {
      number += arr[charIdx];
      if (!inNumber) {
        inNumber = true;
        startIdx = charIdx;
      }
    } else {
      if (inNumber) {
        inNumber = false;
        numbers.push({
          number: Number(number),
          startIdx: Number(startIdx),
          endIdx: Number(charIdx) - 1,
          row,
        });
        number = "";
      }
    }
  }
  if (inNumber) {
    numbers.push({
      number: Number(number),
      startIdx: Number(startIdx),
      endIdx: Number(charIdx),
      row,
    });
  }
  return numbers;
};

const wheelValue = (rowIdx, colIdx, numbersWithDetails) => {
  const foundNumbers = numbersWithDetails.filter((numberDetails) => {
    return SURROUNDING_MATRIX.some(([rowOffset, colOffset]) => {
      return (
        numberDetails.row === rowIdx + rowOffset &&
        numberDetails.startIdx <= colIdx + colOffset &&
        numberDetails.endIdx >= colIdx + colOffset
      );
    });
  });
  if (foundNumbers.length === 2) {
    return foundNumbers[0].number * foundNumbers[1].number;
  }
  return 0;
};

const findSchematicAnswer = (input) => {
  const numbersWithDetails = input.reduce((accum, element, curRow) => {
    const subNumbers = numberAndDetails(element.split(""), curRow);
    return [...accum, ...subNumbers];
  }, []);
  let sum = input.reduce((accum, row, rowIdx) => {
    return (
      accum +
      row.split("").reduce((accum, char, colIdx) => {
        if (char === "*") {
          return accum + wheelValue(rowIdx, colIdx, numbersWithDetails);
        }
        return accum;
      }, 0)
    );
  }, 0);
  return sum;
};

console.log(findSchematicAnswer(schematic));
