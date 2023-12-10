const fs = require("fs");
const games = fs.readFileSync("day2/inputDay2.txt", "utf8").split("\n");
games.pop(); // remove empty line at end of file

const cubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const result = games.reduce((acc, game) => {
  const gameNumberAndDraws = game.split(":");
  const gameNumber = Number(gameNumberAndDraws[0].split(" ")[1]);
  const drawString = gameNumberAndDraws[1];
  const draws = drawString.split(";");
  const possible = draws.every((draw) => {
    const colors = draw.split(",");
    return colors.every((colorDraw) => {
      const colorAndNumber = colorDraw.split(" ");
      const number = Number(colorAndNumber[1]);
      const color = colorAndNumber[2];
      if (cubes[color] >= number) return true;
      return false;
    });
  });
  if (possible) return acc + gameNumber;
  return acc;
}, 0);

console.log(result);
