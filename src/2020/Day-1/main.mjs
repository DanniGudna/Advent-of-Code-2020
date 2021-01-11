/* eslint-disable no-plusplus */
import { data } from './data.mjs';

/**
 * sorts an array of integers
 *
 * @param {Int[]} numArray unsorted array of numbers
 */
function sortNumbers(numArray) {
  return numArray.sort((a, b) => a - b);
}

/**
 * Finds two numbers in a sorted array of numbers that add up to the given number
 *
 * @param {*Int[]} numArray an array of sorted numbers
 * @param {*Integer} number The desired number  to find two numbers that add up to
 *
 * @return {int[]} an array of the integers that add up to the desired number
 */
function findTwoNumberThatAddUp(numArray, number) {
  let lowPointer = 0;
  let highPointer = numArray.length - 1;
  let found = false;
  while (!found && lowPointer < highPointer) {
    const sum = numArray[lowPointer] + numArray[highPointer];
    if (sum === number) {
      found = true;
    } else if (sum < number) {
      lowPointer++;
    } else if (sum > number) {
      highPointer--;
    }
  }
  return [numArray[lowPointer], numArray[highPointer]];
}

function findThreeNumbersThatAddup(numArray, number) {
  for (let firstPointer = 0; firstPointer < numArray.length; firstPointer++) {
    const firstNumber = numArray[firstPointer];
    for (
      let secondPointer = 0;
      secondPointer < numArray.length;
      secondPointer++
    ) {
      if (secondPointer !== firstPointer) {
        const secondNumber = numArray[secondPointer];
        if (firstNumber + secondNumber < number) {
          for (
            let thirdPointer = 0;
            thirdPointer < numArray.length;
            thirdPointer++
          ) {
            if (
              thirdPointer !== secondPointer &&
              thirdPointer !== firstPointer
            ) {
              const thirdNumber = numArray[thirdPointer];
              if (firstNumber + secondNumber + thirdNumber === number) {
                return [firstNumber, secondNumber, thirdNumber];
              }
              if (firstNumber + secondNumber + thirdNumber > number) {
                break;
              }
            }
          }
        } else {
          break;
        }
      }
    }
  }
  return [0, 0, 0];
}

// Functions to get the answers

// get answer to part 1
function part1(numArray, number) {
  const numbersThatAddUp = findTwoNumberThatAddUp(
    sortNumbers(numArray),
    number,
  );
  return numbersThatAddUp[0] * numbersThatAddUp[1];
}

// get answer to part 2
function part2(numArray, number) {
  // TODO
  const numbersThatAddUp = findThreeNumbersThatAddup(
    sortNumbers(numArray),
    number,
  );
  return numbersThatAddUp[0] * numbersThatAddUp[1] * numbersThatAddUp[2];
}

console.log('The answer to Day 1 Part 1 is: ', part1(data, 2020));
console.log('the answer to Day 1 Part 2 is: ', part2(data, 2020));
