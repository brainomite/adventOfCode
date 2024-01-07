performance.mark("start");
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

let locations = Object.keys(map).reduce((accum, position) => {
  if (position[2] === "A") {
    return [...accum, position];
  }
  return [...accum];
}, []);

const cycleObj = {};
const lengths = locations.map((cur) => {
  let step = 0;
  do {
    cycleObj[genCurLocation(step, cur, marchingOrders)] = true;
    step++;
    cur = map[cur][marchingOrders[step % marchingOrders.length]];
  } while (!cycleObj[genCurLocation(step, cur, marchingOrders)]);
  return step - 1;
});

function genCurLocation(step, cur, marchingOrders) {
  return cur + marchingOrders.slice(step % marchingOrders.length).join("");
}

/**
 * Least common multiple found from
 * https://github.com/ccozad/advent-of-code/blob/master/day-8.js
 */

function lcm(numbers) {
  function gcd(a, b) {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }

  return numbers.reduce((a, b) => (a * b) / gcd(a, b));
}
console.log(lcm(lengths));
performance.mark("end");
performance.measure("Start to end", "start", "end");
const measure = performance.getEntriesByType("measure");
console.log("Time:", measure[0].duration + "ms");
