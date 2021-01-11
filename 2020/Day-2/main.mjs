import data from './data.mjs';

/**
 * splits the string to get the corresponding rules
 *
 * @param {string} pw a string in this format: '2-4 s: xgmsdts'
 *
 * @return {Object} a object
 * {firstNumber: {int}, secondNumber: {int}, letter: {string}, password: {string}}
 */
function getRulesAndPassword(pw) {
  const firstSplit = pw.split('-');
  const firstNumber = parseInt(firstSplit[0], 10);
  const secondSplit = firstSplit[1].split(' ');
  const secondNumber = parseInt(secondSplit[0], 10);
  const thirdSplit = secondSplit[1].split(':');
  const letter = thirdSplit[0];
  const password = pw.split(': ')[1];

  return {
    firstNumber,
    secondNumber,
    letter,
    password,
  };
}

/**
 *
 * @param {int} min min number of times the letter should appear
 * @param {int} max max number og time the letter can appear
 * @param {string} letter letter to check
 * @param {string} pw the password
 */
function checkPasswordNumberLimit(min, max, letter, pw) {
  let letterCount = 0;
  for (let i = 0; i < pw.length; i++) {
    if (pw[i] === letter) {
      letterCount++;
    }
  }
  if (letterCount >= min && letterCount <= max) {
    return 1;
  }
  return 0;
}

/**
 * checks if password is valid by checking if the exactly one of the two
 * given position have the given letter
 *
 * @param {int} positionOne the first location to check
 * @param {int} positionTwo the second location to check
 * @param {string} letter letter to check
 * @param {string} pw the password
 */
function checkPasswordLetterLocation(positionOne, positionTwo, letter, pw) {
  let letterCount = 0;
  if (pw[positionOne - 1] === letter) {
    letterCount++;
  }
  if (pw[positionTwo - 1] === letter) {
    letterCount++;
  }
  return letterCount === 1 ? 1 : 0;
}

// functions to get the answers

function findValidPasswordsPart1(passwords) {
  let validCounter = 0;
  passwords.forEach((password) => {
    const rules = getRulesAndPassword(password);
    validCounter += checkPasswordNumberLimit(
      rules.firstNumber,
      rules.secondNumber,
      rules.letter,
      rules.password,
    );
  });
  return validCounter;
}

function findValidPasswordsPart2(passwords) {
  let validCounter = 0;
  passwords.forEach((password) => {
    const rules = getRulesAndPassword(password);
    validCounter += checkPasswordLetterLocation(
      rules.firstNumber,
      rules.secondNumber,
      rules.letter,
      rules.password,
    );
  });
  return validCounter;
}

console.log('The answer to Day 2 Part 1 is: ', findValidPasswordsPart1(data)); // 506
console.log('the answer to Day 2 Part 2 is: ', findValidPasswordsPart2(data)); // 443
