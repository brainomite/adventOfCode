const fs = require("fs");
const input = fs.readFileSync("day06/input.txt", "utf8").split("\n");

const getLine = (idx) =>
  input[idx]
    .split(":")[1]
    .split(" ")
    .filter((char) => char !== "");

const times = getLine(0);
const records = getLine(1);

const getWinningDistanceCount = (time, distance) => {
  let wins = 0;
  for (let timeButtonHeld = 0; timeButtonHeld < time; timeButtonHeld++) {
    if (timeButtonHeld * (time - timeButtonHeld) > distance) {
      wins++;
    }
  }
  return wins;
};

const reduceFunction = (acc, _cur, idx) => {
  return [...acc, getWinningDistanceCount(times[idx], records[idx])];
};

const wins = records.reduce(reduceFunction, []).reduce((acc, cur) => acc * cur);

console.log(wins);
