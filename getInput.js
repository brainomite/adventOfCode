const fs = require("fs");
const path = require("path");
module.exports = (dirName) => {
  const inputPath = path.join(dirName, "input.txt");
  const input = fs.readFileSync(inputPath, "utf8").split("\n");
  input.pop(); // remove last empty line
  return input;
};
