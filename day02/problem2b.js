const fs = require("fs");
const games = fs.readFileSync("day2/inputDay2.txt", "utf8").split("\n");
games.pop(); // remove empty line at end of file

const result = games.reduce((acc, game) => {
  const drawString = game.split(":")[1];
  const cubes = {
    red: 0,
    green: 0,
    blue: 0,
  };
  const colorResults = drawString.split(";").reduce((acc, draw) => {
    return draw.split(",").reduce((colorsAcc, colorDraw) => {
      const colorAndNumber = colorDraw.split(" ");
      const number = Number(colorAndNumber[1]);
      const color = colorAndNumber[2];
      if (cubes[color] < number) colorsAcc[color] = number;
      return colorsAcc;
    }, acc);
  }, cubes);

  return (
    acc + colorResults["red"] * colorResults["green"] * colorResults["blue"]
  );
}, 0);

console.log(result);
