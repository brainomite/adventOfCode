const fs = require("fs");
const schematic = fs.readFileSync("day3/inputDay3.txt", "utf8").split("\n");
// schematic.pop(); // remove empty line at end of file

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
          endIdx: Number(charIdx),
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

const addSurroundingChars = (arr, numberDetails) => {
  const newDetails = { ...numberDetails, surroundingChars: [] };
  for (
    let rowIdx = newDetails.row - 1;
    rowIdx <= numberDetails.row + 1;
    rowIdx++
  ) {
    const row = arr[rowIdx];
    for (
      let colIdx = newDetails.startIdx - 1;
      colIdx <= newDetails.endIdx;
      colIdx++
    ) {
      newDetails.surroundingChars.push(row?.[colIdx]);
    }
  }
  return newDetails;
};

const findSchematicAnswer = (input) => {
  const sum = input
    .reduce((accum, element, curRow) => {
      const subNumbers = numberAndDetails(element.split(""), curRow);
      return [...accum, ...subNumbers];
    }, [])
    .map((numberDetails) => {
      return addSurroundingChars(input, numberDetails);
    })
    .map((numberDetails) => {
      const newDetails = { ...numberDetails };
      newDetails.surroundingChars = newDetails.surroundingChars.filter(
        (char) => char && char !== "." && Number.isNaN(Number(char))
      );
      return newDetails;
    })
    .filter((numberDetails) => {
      return numberDetails.surroundingChars.length > 0;
    })
    .reduce((accum, numberDetails) => {
      return accum + numberDetails.number;
    }, 0);

  return sum;
};

console.log(findSchematicAnswer(schematic));
module.exports = { numberAndDetails, addSurroundingChars };
