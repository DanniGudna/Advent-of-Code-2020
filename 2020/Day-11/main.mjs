import gameOfLifeData from './data.mjs';

/// //////////////////////////
///                       ////
///    Part 1 GoL rules   ////
///                       ////
/// //////////////////////////

function checkSurroundingSeats(row, column, data) {
  let occupiedSeatCounter = 0;

  for (let dx = row - 1; dx <= row + 1; ++dx) {
    for (let dy = column - 1; dy <= column + 1; ++dy) {
      if (data[dx][dy] === '#' && !(dx === row && dy === column)) {
        occupiedSeatCounter++;
      }
    }
  }

  // if the seat is empty and no seats around it then it become occupied
  if (occupiedSeatCounter === 0 && data[row][column] === 'L') {
    return '#';
  }

  // if the seat is occupied and there are 4 or more occupied seats around it then it becomes empty
  if (occupiedSeatCounter > 3 && data[row][column] === '#') {
    return 'L';
  }

  return data[row][column];
}

/// //////////////////////////
///                       ////
///    Part 2 GoL rules   ////
///                       ////
/// //////////////////////////

function checkSurroundingVisibleSeats(row, column, data) {
  let occupiedSeatCounter = 0;

  for (let dx = row - 1; dx <= row + 1; ++dx) {
    for (let dy = column - 1; dy <= column + 1; ++dy) {
      let seatToCheck = data[dx][dy];
      let x = dx;
      let y = dy;
      if (!(dx === row && dy === column)) {
        // directions
        // ============================================================
        // ==   ↖            ====   ⬆            ====   ↗           ==
        // ==   dx < row     ====   dx < row     ====   dx < row     ==
        // ==   dy < column  ====   dy = column  ====   dy > column  ==
        // ==   dx-1 && dy-1 ====   dx-1 && dy   ====   dx-1 && dy+1 ==
        // ==                ====                ====                ==
        // ============================================================
        // ==   ⬅           ====                ====   ➡           ==
        // ==   dx = row     ====   dx = row     ====   dx = row     ==
        // ==   dy < column  ====   dy = column  ====   dy > column  ==
        // ==   dx && dy-1   ====   dx && dy     ====   dx && dy+1   ==
        // ==                ====                ====                ==
        // ============================================================
        // ==   ↙            ====   ⬇            ====   ↘            ==
        // ==   dx > row     ====   dx > row     ====   dx > row     ==
        // ==   dy < column  ====   dy = column  ====   dy > column  ==
        // ==   dx+1 && dy-1 ====   dx+1 && dy   ====   dx+1 && dy+1 ==
        // ==                ====                ====                ==
        // ============================================================;

        while (seatToCheck === '.') {
          if (x < row && y < column) {
            // ↖
            x--;
            y--;
            seatToCheck = data[x][y];
          } else if (x < row && y === column) {
            // ⬆
            x--;
            seatToCheck = data[x][y];
          } else if (x < row && y > column) {
            // ↗
            x--;
            y++;
            seatToCheck = data[x][y];
          } else if (x === row && y < column) {
            // ⬅
            y--;
            seatToCheck = data[x][y];
          } else if (x === row && y > column) {
            // ➡
            y++;
            seatToCheck = data[x][y];
          } else if (x > row && y < column) {
            // ↙
            x++;
            y--;
            seatToCheck = data[x][y];
          } else if (x > row && y === column) {
            // ⬇
            x++;
            seatToCheck = data[x][y];
          } else if (x > row && y > column) {
            // ↘
            x++;
            y++;
            seatToCheck = data[x][y];
          } else {
            console.log('ERROR');
          }
        }

        if (seatToCheck === '#') {
          occupiedSeatCounter++;
        }
      }
    }
  }

  // if the seat is empty and no seats around it then it become occupied
  if (occupiedSeatCounter === 0 && data[row][column] === 'L') {
    return '#';
  }

  // if the seat is occupied and there are 5 or more occupied seats around it then it becomes empty
  if (occupiedSeatCounter > 4 && data[row][column] === '#') {
    return 'L';
  }

  return data[row][column];
}

/// //////////////////////////
///                       ////
///      Game OF Life     ////
///                       ////
/// //////////////////////////

function runGameOfLife(seatingPlan, useVisible) {
  // create a new array that is like the previous one for editing
  const newData = new Array(seatingPlan.length);
  for (let i = 0; i < seatingPlan.length; i++) {
    newData[i] = new Array(seatingPlan[i].length);
  }
  for (let row = 0; row < seatingPlan.length; row++) {
    for (let column = 0; column < seatingPlan[row].length; column++) {
      const value = seatingPlan[row][column];
      // . equals floor
      if (value === '.') {
        newData[row][column] = '.';
      } else if (value === 'E') {
        newData[row][column] = 'E';
      } else {
        newData[row][column] = useVisible
          ? checkSurroundingVisibleSeats(row, column, seatingPlan)
          : checkSurroundingSeats(row, column, seatingPlan);
      }
    }
  }

  // if the new status doesnt equal the old one then call the function again
  if (JSON.stringify(seatingPlan) !== JSON.stringify(newData)) {
    return runGameOfLife(newData, useVisible);
  }

  return newData;
}

/// //////////////////////////
///                       ////
///         Part 1        ////
///                       ////
/// //////////////////////////

function countOccupiedSeats(seatingPlan) {
  let occupiedSeatCounter = 0;
  const finalPlan = runGameOfLife(seatingPlan, false);
  for (let row = 1; row < finalPlan.length - 1; row++) {
    for (let column = 1; column < finalPlan[row].length - 1; column++) {
      const seat = finalPlan[row][column];
      if (seat === '#') {
        occupiedSeatCounter++;
      }
    }
  }
  return occupiedSeatCounter;
}

/// //////////////////////////
///                       ////
///         Part 2        ////
///                       ////
/// //////////////////////////

function countOccupiedSeatsAllDirections(data) {
  let occupiedSeatCounter = 0;
  const finalPlan = runGameOfLife(data, true);
  for (let row = 1; row < finalPlan.length - 1; row++) {
    for (let column = 1; column < finalPlan[row].length - 1; column++) {
      const seat = finalPlan[row][column];
      if (seat === '#') {
        occupiedSeatCounter++;
      }
    }
  }
  return occupiedSeatCounter;
}

console.log('The answer to Day 11 Part 1 is: ', countOccupiedSeats(gameOfLifeData)); // 2211
console.log('the answer to Day 11 Part 2 is: ', countOccupiedSeatsAllDirections(gameOfLifeData)); // 1995
