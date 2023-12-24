const fs = require("fs");
const input = fs.readFileSync("day08/input.txt", "utf8").split("\n");
input.pop(); // remove last empty line

const marchingOrders = input.shift().split("");
input.shift(); // remove empty line

const map = input
  .map((line) => {
    const [source, destination] = line.split(" = ");
    const [L, R] = destination.replace(")", "").replace("(", "").split(", ");
    return { [source]: { L, R } };
  })
  .reduce((accum, item) => ({ ...accum, ...item }), {});

let step = -1;
let location = "AAA";
do {
  step++;
  location = map[location][marchingOrders[step % marchingOrders.length]];
} while (location !== "ZZZ");

console.log(step + 1);
