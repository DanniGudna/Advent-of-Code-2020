import { data } from './data.mjs';

/// //////////////////////////
///                       ////
///         Part 1        ////
///                       ////
/// //////////////////////////

function findNumsThatAddUpp(numArray, number) {
  let lowPointer = 0;
  let highPointer = numArray.length - 1;

  while (lowPointer < highPointer) {
    const sum = numArray[lowPointer] + numArray[highPointer];
    if (sum === number) {
      return true;
    }
    if (sum < number) {
      lowPointer++;
    } else if (sum > number) {
      highPointer--;
    }
  }
  return false;
}

function sortNumbers(numbers) {
  return numbers.sort((a, b) => a - b);
}

function findFaultyNumber(numbers, premable) {
  const numbersClone = [...numbers];
  let pre = premable;
  let start = 0;

  while (pre + 1 < numbersClone.length - 1) {
    if (!findNumsThatAddUpp(sortNumbers(numbersClone.slice(start, pre)), numbersClone[pre])) {
      return numbersClone[pre];
    }
    start++;
    pre++;
  }
  return 'no number found';
}

/// //////////////////////////
///                       ////
///         Part 2        ////
///                       ////
/// //////////////////////////

function findContiguosSetThatAddsUpp(numbers, num) {
  let sum = 0;
  let lowPointer = 0;
  let offset = 0;

  while (lowPointer < numbers.length) {
    // if it equals then return the product of lowponter and offset in data
    if (sum === num) {
      const sorted = sortNumbers(numbers.slice(lowPointer, lowPointer + offset));
      return sorted[0] + sorted[sorted.length - 1];
    }
    // if to high then reset and start from next point
    if (sum > num) {
      // remove the lowest number from the sum
      sum -= numbers[lowPointer];
      // increase lowpointer instead of offset
      lowPointer++;
      offset--;
    } else if (sum < num) {
      // if to low then add the next number and increse the offset
      // add the next number
      sum += numbers[lowPointer + offset];
      offset++;
    }
  }

  // we only get here if we dont find the number
  return 'error finding number';
}

console.log('The answer to Day 9 Part 1 is: ', findFaultyNumber(data, 25)); // 25918798
console.log('the answer to Day 7 Part 2 is: ', findContiguosSetThatAddsUpp(data, 25918798)); // 3340942
