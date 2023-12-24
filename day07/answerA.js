const fs = require("fs");
const input = fs.readFileSync("day07/input.txt", "utf8").split("\n");
input.pop(); // remove last empty line

cardValues = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const total = input
  .map((line) => {
    const [cards, bid] = line.split(" ");
    const hand = cards.split("").reduce((accum, card) => {
      return {
        ...accum,
        [card]: accum[card] ? accum[card] + 1 : 1,
      };
    }, {});
    return { hand, bid, cards };
  })
  .sort((handA, handB) => {
    const gradeA = gradeHand(handA.hand);
    const gradeB = gradeHand(handB.hand);
    if (gradeA > gradeB) return 1;
    if (gradeA < gradeB) return -1;
    for (let cardIdx in handA.cards) {
      if (cardValues[handA.cards[cardIdx]] > cardValues[handB.cards[cardIdx]])
        return 1;
      if (cardValues[handA.cards[cardIdx]] < cardValues[handB.cards[cardIdx]])
        return -1;
    }
    return 0;
  })
  .reduce((accum, handsAndBid, idx) => accum + handsAndBid.bid * (idx + 1), 0);

console.log(total);

function gradeHand(hand) {
  const isFiveOfAKind = () => Object.values(hand).some((value) => value === 5);
  const isFourOfAKind = () => Object.values(hand).some((value) => value === 4);
  const isFullHouse = () =>
    Object.values(hand).some((value) => value === 3) &&
    Object.values(hand).some((value) => value === 2);
  const isThreeOfAKind = () => Object.values(hand).some((value) => value === 3);
  const isTwoPair = () =>
    Object.values(hand).filter((value) => value === 2).length === 2;
  const isPair = () =>
    Object.values(hand).filter((value) => value === 2).length === 1;
  switch (true) {
    case isFiveOfAKind():
      return 6;
    case isFourOfAKind():
      return 5;
    case isFullHouse():
      return 4;
    case isThreeOfAKind():
      return 3;
    case isTwoPair():
      return 2;
    case isPair():
      return 1;
    default:
      return 0;
  }
}
