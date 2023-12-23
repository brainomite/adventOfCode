// load a file
const fs = require('fs');
const input = fs.readFileSync("day1/problem1/input.txt", "utf8");

const lines = input.split('\n')
const answer = lines.reduce((acc, line) => {
  const chars = line.split('');
  const firstNum = chars.find(char => Number.isInteger(Number(char)));
  const lastNum = chars.findLast(char => Number.isInteger(Number(char)));
  const subAnswer = Number(firstNum + lastNum);
  return acc + subAnswer;
}, 0);
 
console.info(answer);