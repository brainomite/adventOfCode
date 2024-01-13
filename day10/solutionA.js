const possibleTiles = {
  "|": {
    north: ["|", "7", "F"],
    south: ["|", "L", "J"],
    east: [],
    west: [],
    generateExits: ([xPos, yPos]) => [
      [xPos - 1, yPos],
      [xPos + 1, yPos],
    ],
  },
  "-": {
    north: [],
    south: [],
    east: ["-", "7", "J"],
    west: ["-", "F", "L"],
    generateExits: ([xPos, yPos]) => [
      [xPos, yPos - 1],
      [xPos, yPos + 1],
    ],
  },
  L: {
    north: ["|", "7", "F"],
    south: [],
    east: ["-", "7", "J"],
    west: [],
    generateExits: ([xPos, yPos]) => [
      [xPos - 1, yPos],
      [xPos, yPos + 1],
    ],
  },
  J: {
    north: ["|", "7", "F"],
    south: [],
    east: [],
    west: ["-", "F", "L"],
    generateExits: ([xPos, yPos]) => [
      [xPos - 1, yPos],
      [xPos, yPos - 1],
    ],
  },
  7: {
    north: [],
    south: ["|", "L", "J"],
    east: [],
    west: ["-", "F", "L"],
    generateExits: ([xPos, yPos]) => [
      [xPos, yPos - 1],
      [xPos + 1, yPos],
    ],
  },
  F: {
    north: [],
    south: ["|", "L", "J"],
    east: ["-", "7", "J"],
    west: [],
    generateExits: ([xPos, yPos]) => [
      [xPos + 1, yPos],
      [xPos, yPos + 1],
    ],
  },
};

const determineStartTile = ([xPos, yPos], maze) => {
  const checkMatches = (curTile, direction, xDiff, yDiff) => {
    const tileToCheck = maze[xPos + xDiff][yPos + yDiff];
    return possibleTiles[curTile][direction].length === 0
      ? true
      : possibleTiles[curTile][direction].includes(tileToCheck);
  };
  return Object.keys(possibleTiles).find((curTile) => {
    const northMatches = checkMatches(curTile, "north", -1, 0);
    const southMatches = checkMatches(curTile, "south", 1, 0);
    const westMatches = checkMatches(curTile, "west", 0, -1);
    const eastMatches = checkMatches(curTile, "east", 0, 1);
    return northMatches && southMatches && westMatches && eastMatches;
  });
};

/**
 *
 * @param {string[][]} tiles
 */
const posOfS = (tiles) => {
  const pos = tiles.reduce((accum, cur, idx) => {
    const sPos = cur.findIndex((char) => char === "S");
    if (sPos !== -1) return [idx, sPos];
    return accum;
  }, []);
  return pos;
};

const getLoopSize = (maze, startPos, startTile) => {
  const visitedCoordinates = {};
  const recordVisit = (coordinates) =>
    (visitedCoordinates[JSON.stringify(coordinates)] = true);
  const hasVisited = (coordinates) =>
    visitedCoordinates[JSON.stringify(coordinates)];
  const getNewPos = (curPos) => {
    const curChar = maze[curPos[0]][curPos[1]];
    const [left, right] = possibleTiles[curChar].generateExits(curPos);
    return hasVisited(left) ? right : left;
  };
  let size = 0;
  recordVisit(startPos);
  let [leftPos, rightPos] = possibleTiles[startTile].generateExits(startPos);

  do {
    if (hasVisited(leftPos) && hasVisited(rightPos)) return size;
    recordVisit(leftPos);
    recordVisit(rightPos);
    leftPos = getNewPos(leftPos);
    rightPos = getNewPos(rightPos);
    size++;
  } while (true);
};

/**
 *
 * @param {string[]} input
 * @returns
 */
const solution = (maze) => {
  const tiles = maze.map((line) => line.split(""));
  const startPos = posOfS(tiles);
  const startTile = determineStartTile(startPos, maze);
  return getLoopSize(maze, startPos, startTile);
};

module.exports = solution;
