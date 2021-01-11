import { data, eyeColors, notValidchars } from './data.mjs';

/**
 * checks if a number is inbetween two other given numbers
 *
 * @param {int} value value to check
 * @param {int} min min allowed value
 * @param {int} max max allowed value
 *
 * @return {bool} true if in between else false
 */
function isBetween(value, min, max) {
  return value >= min && value <= max;
}

/**
 * creates one string out of an array of strings
 *
 * @param {[string]} passport an array of strings
 *
 * @return{string} a string concated out of all the strings in `passport`
 */
function createPassport(passport) {
  let passportString = '';
  passport.forEach((line) => {
    passportString += line + ' ';
  });

  return passportString;
}

/* passportObjectForm:
{
  hcl: [ '#7d3b0c' ],
  pid: [ '431742871' ],
  ecl: [ 'hzl' ],
  hgt: [ '169cm' ],
  eyr: [ '2023' ],
  iyr: [ '2017' ],
  byr: [ '1994' ]
}
*/

/**
 *  checks if the given passport object passes all the rules
 *
 * @param {object}passport see passportObject above
 *
 * @return {bool} returns true if the passports passes all the rules
 */
function validateInput(passport) {
  // byr
  if (passport.byr[0].length !== 4 || !isBetween(parseInt(passport.byr[0], 10), 1920, 2002)) {
    return false;
  }
  // iyr
  if (passport.iyr[0].length !== 4 || !isBetween(parseInt(passport.iyr[0], 10), 2010, 2020)) {
    return false;
  }
  // eyr
  if (passport.eyr[0].length !== 4 || !isBetween(parseInt(passport.eyr[0], 10), 2020, 2030)) {
    return false;
  }
  // hgt
  const cmOrIn = passport.hgt[0].slice(-2);
  if (cmOrIn !== 'cm' && cmOrIn !== 'in') {
    return false;
  }
  if (
    (cmOrIn === 'cm' && !isBetween(parseInt(passport.hgt[0], 10), 150, 193)) ||
    (cmOrIn === 'in' && !isBetween(parseInt(passport.hgt[0], 10), 59, 76))
  ) {
    return false;
  }

  // ecl
  if (!eyeColors.includes(passport.ecl[0])) {
    return false;
  }

  // hcl
  // length
  if (passport.hcl[0].length !== 7) {
    return false;
  }
  // start
  if (passport.hcl[0][0] !== '#') {
    return false;
  }
  // valid letters
  if (passport.hcl[0].includes(notValidchars)) {
    return false;
  }

  // pid
  if (passport.pid[0].length !== 9) {
    return false;
  }

  return true;
}

/**
 * Checks if the object is of length 7. See explantion in readme
 *
 * @param {object}passportObject see passportObjectForm above
 *
 * @return {int} returns 1 if it passes the passport check else 0
 */
function checkIfRealPassport(passportObject) {
  if (Object.keys(passportObject).length !== 7) {
    return 0;
  }
  return 1;
}

/**
 * calls vlaidation functions for the given passportObject
 *
 * @param {object} passportObject c
 *
 * @return {int} returns 1 if it passes all the tests else 0
 */
function validatePassport(passportObject) {
  if (checkIfRealPassport(passportObject)) {
    if (!validateInput(passportObject)) {
      return 0;
    }
    return 1;
  }
  return 0;
}

/**
 * creates an object out of the given string. split on spaces and ':'
 *
 * @param {string} passportString a string, see readme for form
 *
 * @return {object} see passportObjectForm above
 */
function createPassportObject(passportString) {
  const values = passportString.split(' ');
  const passPortObject = {};
  values.forEach((value) => {
    if (value.length > 0) {
      const valueKey = value.split(':');
      if (valueKey[0] !== 'cid') {
        passPortObject[valueKey[0]] = [valueKey[1]];
      }
    }
  });
  return passPortObject;
}

// functions to get the answers

function findRealPassports(passports) {
  let valid = 0;
  let passportLines = [];
  passports.forEach((line) => {
    if (line !== '') {
      passportLines.push(line);
    } else {
      valid += checkIfRealPassport(createPassportObject(createPassport(passportLines)));
      passportLines = [];
    }
  });
  // do the last passport as well
  valid += checkIfRealPassport(createPassportObject(createPassport(passportLines)));
  return valid;
}

function findValidPassports(passports) {
  let valid = 0;
  let passportLines = [];
  passports.forEach((line) => {
    if (line !== '') {
      passportLines.push(line);
    } else {
      valid += validatePassport(createPassportObject(createPassport(passportLines)));
      passportLines = [];
    }
  });
  // do the last passport as well
  valid += validatePassport(createPassportObject(createPassport(passportLines)));
  return valid;
}

console.log('The answer to Day 3 Part 1 is: ', findRealPassports(data)); // 216
console.log('the answer to Day 3 Part 2 is: ', findValidPassports(data)); // 150
