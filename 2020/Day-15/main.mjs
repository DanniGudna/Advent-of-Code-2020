import data from './data.mjs';

/// //////////////////////////
///                       ////
///         Part 1        ////
///                       ////
/// //////////////////////////

function startCountingGameNaive(startingNumbers, turnLimit) {
  const spokenNumbersArray = [...startingNumbers];
  const spokenNumbersObject = {};
  let turnNumber = 1;

  // initialize the Object
  for (let i = 0; i < spokenNumbersArray.length; i++) {
    const number = spokenNumbersArray[i];
    spokenNumbersObject[number] = i + 1;
    turnNumber++;
  }

  // add the number 0 as the first number after the starting numbers
  // since the starting numbers are always all unique
  spokenNumbersArray.push(0);
  turnNumber++;

  while (turnNumber <= turnLimit) {
    // get the last number in the spoken number array
    const numberToCheck = spokenNumbersArray[spokenNumbersArray.length - 1];

    // if it exists in the object then we have to calculate the next number
    if (spokenNumbersObject[numberToCheck]) {
      // calculate the next number said
      const nextNumber = turnNumber - 1 - spokenNumbersObject[numberToCheck];
      // update when the current number to check was last spoken
      spokenNumbersObject[numberToCheck] = turnNumber - 1;
      // add the nextNumber to the spokenNumbers array
      spokenNumbersArray.push(nextNumber);
    }
    // else we add a zero and update when the current checked number was spoken
    else {
      spokenNumbersArray.push(0);
      spokenNumbersObject[numberToCheck] = turnNumber - 1;
    }
    // add a  turn number and continue
    turnNumber++;
  }

  return spokenNumbersArray[spokenNumbersArray.length - 1];
}
/// //////////////////////////
///                       ////
///         Part 2        ////
///                       ////
/// //////////////////////////

function startCountingGameOptimizied(startingNumbers, turnLimit) {
  const spokenNumbersArray = [...startingNumbers];
  const spokenNumbersObject = new Map();
  let turnNumber = 1;

  // initialize the Object
  for (let i = 0; i < spokenNumbersArray.length; i++) {
    const number = spokenNumbersArray[i];
    spokenNumbersObject.set(number, { lastSpoken: i + 1 });
    turnNumber++;
  }

  // add the number 0 as the first number after the starting numbers
  // since the starting numbers are always all unique
  spokenNumbersArray.push(0);
  turnNumber++;

  while (turnNumber <= turnLimit) {
    // get the last number in the spoken number array
    const numberToCheck = spokenNumbersArray[spokenNumbersArray.length - 1];

    // if it exists in the object then we have to calculate the next number
    if (spokenNumbersObject.has(numberToCheck)) {
      // calculate the next number said
      const nextNumber = turnNumber - 1 - spokenNumbersObject.get(numberToCheck).lastSpoken;
      // update when the current number to check was last spoken
      spokenNumbersObject.set(numberToCheck, { lastSpoken: turnNumber - 1 });
      // add the nextNumber to the spokenNumbers array
      spokenNumbersArray.push(nextNumber);
    }
    // else we add a zero and update when the current checked number was spoken
    else {
      spokenNumbersArray.push(0);
      spokenNumbersObject.set(numberToCheck, { lastSpoken: turnNumber - 1 });
    }
    // add a  turn number and continue
    turnNumber++;
  }

  return spokenNumbersArray[spokenNumbersArray.length - 1];
}

console.log('The answer to Day 15 Part 1 is: ', startCountingGameNaive(data, 2020)); // 492
console.log('the answer to Day 15 Part 2 is: ', startCountingGameOptimizied(data, 30000000)); // 63644
