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

const finalScore = games.reduce((acc, game) => {
  const winners = game.winners.filter((winner) => winner !== "");
  const picks = game.picks.filter((pick) => pick !== "");
  const wins = winners.filter((winner) => picks.includes(winner)).length;
  return acc + calcScore(wins);
}, 0);
console.log(finalScore);

function calcScore(wins) {
  if (wins === 0) return 0;
  let score = 1;
  for (let i = 1; i < wins; i++) {
    score *= 2;
  }
  return score;
}
