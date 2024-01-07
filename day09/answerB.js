performance.mark("start");
const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputPath, "utf8").split("\n");
input.pop(); // remove last empty line

console.log(solution(input));

performance.mark("end");
performance.measure("Start to end", "start", "end");
const measure = performance.getEntriesByType("measure");
console.log("Time:", measure[0].duration + "ms");

function solution(input) {
  const sum = input
    .map((line) => line.split(" "))
    .map((history) => getLastSequenceNumber(history))
    .reduce((accum, cur) => accum + cur);
  return sum;
}

/**
 *
 * @param {number[]} history of a number
 */
function getLastSequenceNumber(history) {
  const oldLastNumbers = genHistorySequences(history).map((sequence) =>
    parseInt(sequence[0])
  );
  oldLastNumbers.shift();
  const answer = oldLastNumbers.reduce((accum, cur) => {
    return cur - accum;
  }, 0);
  return answer; // remove the zero sequence
}

function genHistorySequences(history) {
  const historySequences = [history];
  const isZeroes = () => historySequences.at(-1).every((num) => num === 0);
  while (!isZeroes()) {
    const newSequence = historySequences
      .at(-1)
      .reduce((acc, curVal, idx, arr) => {
        if (!idx) return [];
        return [...acc, curVal - arr[idx - 1]];
      }, []);
    historySequences.push(newSequence);
  }
  return historySequences.reverse();
}
