import data from './data.mjs';

/// //////////////////////////
///                       ////
///    Binary Functions   ////
///                       ////
/// //////////////////////////

// simplicity
const x = 'X';
const MASK = 'mask';

// calcualte binary
function calculateBinary(binaryArray) {
  const binaryString = binaryArray.join('');
  // no need to invent the wheel
  return parseInt(binaryString, 2);
}

// turn sring to int array
function createIntArray(binaryString) {
  const intArray = [...binaryString];
  return intArray;
}

// https://stackoverflow.com/a/24153275
function createBinaryString(nMask) {
  let sMask = '';
  // nMask must be between -2147483648 and 2147483647
  for (
    let nFlag = 0, nShifted = nMask;
    nFlag < 32;
    // eslint-disable-next-line no-bitwise
    nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1
  );
  return '0000' + sMask; // add four zeros at the start to make it a 36bit int
}

// generate an array of mask coordinates
// the coordinates include the position and number of all values in the mask that are not X
function generateMaskCoordinates(mask, inconsequential) {
  const maskCoordinates = [];
  for (let i = 0; i < mask.length; i++) {
    const number = mask[i];
    if (number !== inconsequential) {
      maskCoordinates.push({ index: i, value: number });
    }
  }
  return maskCoordinates;
}

/// //////////////////////////
///                       ////
///         Part 1        ////
///                       ////
/// //////////////////////////

const memory = [];
let currentMask;

// apply mask
function applyMask(mask, memoryValue) {
  const maskCoordinates = generateMaskCoordinates(mask, x);
  const value = createIntArray(createBinaryString(memoryValue));
  maskCoordinates.forEach((coordinate) => {
    value[coordinate.index] = coordinate.value;
  });
  return value;
}

function writeToMemory(input) {
  input.forEach((program) => {
    const order = program.split(' ')[0];
    // if mask then change the mask
    if (order === MASK) {
      currentMask = program.split('= ')[1];
    }
    // if mem then write to memory
    else {
      const valueAfterMask = applyMask(currentMask, program.split('= ')[1]);
      memory[program.split('[')[1].split(']')[0]] = calculateBinary(valueAfterMask);
    }
  });
  let sum = 0;
  memory.forEach((value) => {
    if (value) {
      sum += value;
    }
  });
  return sum;
}

/// //////////////////////////
///                       ////
///         Part 2        ////
///                       ////
/// //////////////////////////

// apply mask
function applyMaskVersion2(mask, memoryValue) {
  const maskCoordinates = generateMaskCoordinates(mask, '0');
  const value = createIntArray(createBinaryString(memoryValue));
  maskCoordinates.forEach((coordinate) => {
    value[coordinate.index] = coordinate.value;
  });
  return value;
}

function createAllBinaryStrings(binaryStrings) {
  // if one of the strings does not have nay x then all of them dont have an x
  const hasX = binaryStrings[0].findIndex((ele) => ele === x);
  const allStrings = [];
  for (const binaryString of binaryStrings) {
    const indexOfX = binaryString.findIndex((ele) => ele === x);
    if (indexOfX === -1) {
      break;
    }
    binaryString[indexOfX] = '0';
    const zeroBinary = [...binaryString];
    allStrings.push(zeroBinary);
    binaryString[indexOfX] = '1';
    const oneBinary = [...binaryString];
    allStrings.push(oneBinary);
  }

  return hasX === -1 ? binaryStrings : createAllBinaryStrings(allStrings);
}

function writeToMemoryVersion2(input) {
  let sum = 0;
  input.forEach((program) => {
    const order = program.split(' ')[0];
    // if mask then change the mask
    if (order === MASK) {
      currentMask = program.split('= ')[1];
    }
    // if mem then write to memory
    else {
      const valueAfterMask = applyMaskVersion2(currentMask, program.split('[')[1].split(']')[0]);
      const allPosibleStrings = createAllBinaryStrings([valueAfterMask]);
      for (const possibleString of allPosibleStrings) {
        // if this value is already occupied in the memory then subtract that value from the total
        // and then change the value in memory to the current value for future refrence
        if (memory[calculateBinary(possibleString)]) {
          sum -= memory[calculateBinary(possibleString)];
          memory[calculateBinary(possibleString)] = parseInt(program.split('= ')[1], 10);
        }
        // else we just add it in the memory without subtracting anything
        else {
          memory[calculateBinary(possibleString)] = parseInt(program.split('= ')[1], 10);
        }
      }
      // add the sum of the current program multiplied by all possible strings
      sum += parseInt(program.split('= ')[1], 10) * allPosibleStrings.length;
    }
  });
  return sum;
}

console.log('The answer to Day 14 Part 1 is: ', writeToMemory(data)); // 11926135976176
console.log('the answer to Day 14 Part 2 is: ', writeToMemoryVersion2(data)); // 4330547254348
