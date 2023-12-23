const fs = require("fs");
const input = fs.readFileSync("day04/input.txt", "utf8").split("\n");
input.pop(); // remove empty line at end of file

const games = input.map((card) => {
  const backOfCard = card.split(": ")[1];
  const [winners, picks] = backOfCard.split(" | ");
  return {
    winners: winners.split(" "),
    picks: picks.split(" "),
  };
});

const gamesObj = games.reduce((accum, game, idx) => {
  return { ...accum, [idx]: [game] };
}, {});

for (let index = 0; index < games.length; index++) {
  const curGame = games[index];
  const curGameWins = countWins(curGame);
  for (let cards = 0; cards < gamesObj[index].length; cards++) {
    for (
      let winIdx = index + 1;
      winIdx < games.length && winIdx <= index + curGameWins;
      winIdx++
    ) {
      const aGame = gamesObj[winIdx][0];
      gamesObj[winIdx].push(aGame);
    }
  }
}

const score = Object.keys(gamesObj).reduce((accum, key) => {
  return accum + gamesObj[key].length;
}, 0);

console.log(score);

function countWins(game) {
  const winners = game.winners.filter((winner) => winner !== "");
  const picks = game.picks.filter((pick) => pick !== "");
  const wins = winners.filter((winner) => picks.includes(winner)).length;
  return wins;
}
