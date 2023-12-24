const fs = require("fs");
const input = fs.readFileSync("day06/input.txt", "utf8").split("\n");

const getLine = (idx) =>
  input[idx]
    .split(":")[1]
    .split(" ")
    .filter((char) => char !== "")
    .join("");

const time = getLine(0);
const distance = getLine(1);

let wins = 0;

for (let timeButtonHeld = 0; timeButtonHeld < time; timeButtonHeld++) {
  if (timeButtonHeld * (time - timeButtonHeld) > distance) {
    wins++;
  }
}

console.log(wins);
