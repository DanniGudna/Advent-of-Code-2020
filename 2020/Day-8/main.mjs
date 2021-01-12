import { data, createArray } from './data.mjs';

/// //////////////////////////
///                       ////
///         Part 1        ////
///                       ////
/// //////////////////////////

let accumulator = 0;
let currentIndex = 0;

function runBootCode(instructions) {
  const activeCode = instructions[currentIndex];
  if (activeCode[1] === 1 || currentIndex > instructions.length - 1) {
    return accumulator;
  }
  // acc
  if (activeCode[0].split(' ')[0] === 'acc') {
    const numberValue = activeCode[0].split(' ')[1];
    accumulator += parseInt(numberValue, 10);
    activeCode[1]++;
    currentIndex++;
    return runBootCode(instructions);
  }
  // jmp
  if (activeCode[0].split(' ')[0] === 'jmp') {
    const numberValue = activeCode[0].split(' ')[1];
    activeCode[1]++;
    currentIndex += parseInt(numberValue, 10);
    return runBootCode(instructions);
  }

  // else
  // nop
  activeCode[1] += 1;
  currentIndex++;
  return runBootCode(instructions);
}

/// //////////////////////////
///                       ////
///         Part 2        ////
///                       ////
/// //////////////////////////

let acc = 0;
let index = 0;
let orderNumber = 1;
const lastIndex = [];

// sets a numberic value to all process in the order they are procesed
// also adds to the index array with index indication to the queue
function getCodeQueue(instructions) {
  const activeCode = instructions[index];
  if (activeCode[1] !== 0) {
    return instructions;
  }
  // acc
  if (activeCode[0].split(' ')[0] === 'acc') {
    const numberValue = activeCode[0].split(' ')[1];
    acc += parseInt(numberValue, 10);
    activeCode[1] = orderNumber;
    lastIndex.push(index);
    orderNumber++;
    index++;
    return getCodeQueue(instructions);
  }
  // jmp
  if (activeCode[0].split(' ')[0] === 'jmp') {
    const numberValue = activeCode[0].split(' ')[1];
    activeCode[1] = orderNumber;
    orderNumber++;
    lastIndex.push(index);
    index += parseInt(numberValue, 10);
    return getCodeQueue(instructions);
  }

  // nop
  // else if (activeCode[0].split(' ')[0] === 'nop') {
  activeCode[1] = orderNumber;
  orderNumber++;
  lastIndex.push(index);
  index++;
  return getCodeQueue(instructions);
  // }
}

function checkIfCodeFinishes(instructions) {
  const activeCode = instructions[index];
  if (index > instructions.length - 1) {
    return acc;
  }
  if (activeCode[1] === -1000) {
    return -1;
  }
  // acc
  if (activeCode[0].split(' ')[0] === 'acc') {
    const numberValue = activeCode[0].split(' ')[1];
    acc += parseInt(numberValue, 10);
    activeCode[1] = -1000;
    index++;
    return checkIfCodeFinishes(instructions);
  }
  // jmp
  if (activeCode[0].split(' ')[0] === 'jmp') {
    const numberValue = activeCode[0].split(' ')[1];
    activeCode[1] = -1000;
    index += parseInt(numberValue, 10);
    return checkIfCodeFinishes(instructions);
  }

  // else
  // nop
  activeCode[1] = -1000;
  index++;
  return checkIfCodeFinishes(instructions);
}

function fixCorruptedInstruction(instructionArray) {
  let accTest;
  getCodeQueue(instructionArray);
  const cloneInstructionArray = [...instructionArray];

  // work our way backwards in order to find the function that causes the loop
  for (let i = lastIndex.length - 1; i > 0; i--) {
    const ind = lastIndex[i];
    const oldValue = instructionArray[ind][0];

    // change the value if it is jmp or nop
    if (cloneInstructionArray[ind][0].split(' ')[0] === 'nop') {
      cloneInstructionArray[ind][0] = 'jmp ' + cloneInstructionArray[ind][0].split(' ')[1];
    } else if (cloneInstructionArray[ind][0].split(' ')[0] === 'jmp') {
      cloneInstructionArray[ind][0] = 'nop ' + cloneInstructionArray[ind][0].split(' ')[1];
    }

    acc = 0;
    index = 0;
    // check if the code finishes now
    accTest = checkIfCodeFinishes(cloneInstructionArray);
    if (accTest !== -1) {
      break;
    }
    // restore the original value and try again
    cloneInstructionArray[ind][0] = oldValue;
  }

  return accTest;
}

console.log('the answer to Day 8 Part 1 is: ', runBootCode(createArray(data))); // 1688
console.log('The answer to Day 8 Part 2 is: ', fixCorruptedInstruction(createArray(data))); // 1930
