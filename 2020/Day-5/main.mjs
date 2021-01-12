import data from './data.mjs';

// create a object with the values for rows and column
function createRowColumn(boardingPass) {
  return { row: boardingPass.substring(0, 7), column: boardingPass.substring(7, 10) };
}

// finds the location with recursion
function findSeatLocation(boardingPass, min, max) {
  if (min === max) {
    return min - 1;
  }
  const mid = (min + max) / 2;
  // f and l mean lower half
  if (boardingPass[0] === 'F' || boardingPass[0] === 'L') {
    return findSeatLocation(boardingPass.substring(1), min, mid);
  }
  // else b and r mean the upper half
  return findSeatLocation(boardingPass.substring(1), mid, max);
}

// main
function findHighestSeatId(boardingPasses) {
  let highestId = -1;
  boardingPasses.forEach((el) => {
    const rowColumn = createRowColumn(el);

    const row = findSeatLocation(rowColumn.row, 0, 128);
    const column = findSeatLocation(rowColumn.column, 0, 8);

    const sum = row * 8 + column;
    highestId = highestId > sum ? highestId : sum;
  });

  return highestId;
}

function createArrayOfIds(boardingPasses) {
  const array = [];
  boardingPasses.forEach((el) => {
    array.push(findHighestSeatId([el]));
  });
  return array;
}

function findMissingSeat(boardingPasses) {
  // we start by sorting the array based on seat id
  const boardingPassIds = createArrayOfIds(boardingPasses).sort((a, b) => a - b);
  let previousId = boardingPassIds[0];
  // we then loop our array of seat ids until we find a missing number
  for (let i = 1; i < boardingPassIds.length; i++) {
    const boardingPassId = boardingPassIds[i];
    if (previousId + 1 !== boardingPassId) {
      previousId = boardingPassId;
      break;
    }
    previousId = boardingPassId;
  }
  return previousId;
}

console.log('The answer to Day 5 Part 1 is: ', findHighestSeatId(data)); // 826
console.log('the answer to Day 5 Part 2 is: ', findMissingSeat(data)); // 678
