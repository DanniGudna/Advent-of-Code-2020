import data from './data.mjs';

function getRulesAndPassword(pw) {
  const firstSplit = pw.split('-');
  const minNumber = firstSplit[0];
  const secondSplit = firstSplit[1].split(' ');
  const maxNumber = secondSplit[0];
  const thirdSplit = secondSplit[1].split(':');
  const letter = thirdSplit[0];
  const password = pw.split(': ')[1];

  return [minNumber, maxNumber, letter, password];
}

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

function checkPasswordLetterLocation(min, max, letter, pw) {
  let letterCount = 0;
  if (pw[min - 1] === letter) {
    letterCount++;
  }
  if (pw[max - 1] === letter) {
    letterCount++;
  }
  return letterCount === 1 ? 1 : 0;
}

function findValidPasswordsPart1(passwords) {
  let validCounter = 0;
  passwords.forEach((password) => {
    const rules = getRulesAndPassword(password);
    validCounter += checkPasswordNumberLimit(
      rules[0],
      rules[1],
      rules[2],
      rules[3],
    );
  });
  return validCounter;
}

function findValidPasswordsPart2(passwords) {
  let validCounter = 0;
  passwords.forEach((password) => {
    const rules = getRulesAndPassword(password);
    validCounter += checkPasswordLetterLocation(
      rules[0],
      rules[1],
      rules[2],
      rules[3],
    );
  });
  return validCounter;
}

console.log('The answer to Day 2 Part 1 is: ', findValidPasswordsPart1(data));
console.log('the answer to Day 2 Part 2 is: ', findValidPasswordsPart2(data));
