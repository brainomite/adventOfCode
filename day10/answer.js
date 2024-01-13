const solutionA = require("./solutionA");
performance.mark("start");
const input = require("../getInput")(__dirname);

console.log("solution A:", solutionA(input));

performance.mark("end");
performance.measure("Start to end", "start", "end");
const measure = performance.getEntriesByType("measure");
console.log("Time:", measure[0].duration + "ms");
