const fs = require("fs");
const { get } = require("http");
const input = fs.readFileSync("day05/input.txt", "utf8").split("\n");
// input.pop(); // remove empty line at end of file

// const seeds = [];
const maps = {
  soils: [],
  fertilizers: [],
  waters: [],
  lights: [],
  temps: [],
  humidities: [],
  locations: [],
};

const seedLine = input.shift();
const seeds = seedLine.split(": ")[1].split(" ").map(Number);

input.shift(); // remove empty line
getMaps(maps.soils);
getMaps(maps.fertilizers);
getMaps(maps.waters);
getMaps(maps.lights);
getMaps(maps.temps);
getMaps(maps.humidities);
getMaps(maps.locations);

function getMaps(maps) {
  input.shift(); // remove header line
  let line = input.shift();
  while (line !== "") {
    const [destination, beginning, range] = line.split(" ").map(Number);
    maps.push({ destination, beginning, range });
    line = input.shift();
  }
}
let closestSoil = Infinity;
for (let idx = 0; idx < seeds.length; idx += 2) {
  const start = seeds[idx];
  const count = seeds[idx + 1];
  for (let i = start; i < start + count; i++) {
    const soil = findSoilFromSeed(i);
    if (soil < closestSoil) {
      closestSoil = soil;
    }
  }
}

console.log(closestSoil);

function translate(value, map) {
  const foundMapping = map.find(({ beginning, range }) => {
    return value >= beginning && value < beginning + range;
  });
  if (foundMapping === undefined) return value;
  const dif = value - foundMapping.beginning;
  return foundMapping.destination + dif;
}

function findSoilFromSeed(seed) {
  const soil = translate(seed, maps.soils);
  const fertilizer = translate(soil, maps.fertilizers);
  const water = translate(fertilizer, maps.waters);
  const light = translate(water, maps.lights);
  const temp = translate(light, maps.temps);
  const humidity = translate(temp, maps.humidities);
  const location = translate(humidity, maps.locations);
  return location;
}
