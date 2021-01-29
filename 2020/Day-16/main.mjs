import { data, test } from './data.mjs';

/// //////////////////////////
///                       ////
///    Simplify rules     ////
///                       ////
/// //////////////////////////

/*     const numA = a.split('-')[0];
    const numB = b.split('-')[0];
    return numA - numB; */

// sort the rule array based on the starting number for each rule
function sortRules(ruleArray) {
  return ruleArray.sort((a, b) => a.start - b.start);
}

// split up all the rules and put in an array
function splitUpTheRules(allRules) {
  const rulesArray = [];
  // eslint-disable-next-line no-unused-vars
  for (const [key, value] of Object.entries(allRules)) {
    const ruleSplit = value.split(' or ');
    rulesArray.push(ruleSplit[0], ruleSplit[1]);
  }
  return rulesArray;
}

// check if next rules falls within the current rule, if so combine them and keep looking
function combineRules(rulesArray, combinedArray) {
  // if there are no rules left in the rules array then return the combined Rules Array
  if (rulesArray.length === 0) {
    return combinedArray;
  }
  // if there is only one left then add it to the combinedArray and return it
  if (rulesArray.length === 1) {
    combinedArray.push(rulesArray[0]);
    return combinedArray;
  }
  // else check if we can combine the next rule with this one and then call this function again
  const rule = rulesArray[0];
  const nextRule = rulesArray[1];
  const ruleStartingNumber = rule.start;
  const ruleEndNumber = rule.end;
  const nextNumber = nextRule.start;

  // if the next rule starts within the current rule then we can combine them
  if (nextNumber >= ruleStartingNumber && nextNumber <= ruleEndNumber + 1) {
    // check wich rule ends later
    const newEndNumber = ruleEndNumber > nextRule.end ? ruleEndNumber : nextRule.end;
    const newRule = { start: ruleStartingNumber, end: newEndNumber };
    // remove the first two values in the rules array
    rulesArray.shift();
    rulesArray.shift();
    // add the new rule to the begining
    rulesArray.unshift(newRule);
  }
  // if the new rule does not start within the current rule then we cant combine this rule futher
  // remove it from the rules array and add it to the combinedArray
  else {
    combinedArray.push(rulesArray[0]);
    rulesArray.shift();
  }

  return combineRules(rulesArray, combinedArray);
}

// make the rules an object so it is easier to work with
function makeRulesAnObject(rulesArray) {
  const newRulesArray = [];
  rulesArray.forEach((rule) => {
    const start = Number(rule.split('-')[0]);
    const end = Number(rule.split('-')[1]);

    newRulesArray.push({ start, end });
  });

  return newRulesArray;
}

// setup the rules
function setUpRules(rulesArray) {
  return combineRules(sortRules(makeRulesAnObject(splitUpTheRules(rulesArray))), []);
}

/// //////////////////////////
///                       ////
///         Part 1        ////
///                       ////
/// //////////////////////////

function findInvalidNumbers(ticket, rulesArray) {
  // we start our rules check in the middle, that way we will at most check half of the rules.
  const startingIndex = Math.floor(rulesArray.length / 2);
  const invalidNumbers = [];
  // const wholeTicketValid = true;
  ticket.forEach((ticketValue) => {
    let indexOfRuleToCheck = startingIndex;
    let valid = false;
    let outOfBounds = false;
    while (!outOfBounds && !valid) {
      const currentRule = rulesArray[indexOfRuleToCheck];
      // if the ticket number fits within a rule then it is valid and we can carry on
      if (ticketValue >= currentRule.start && ticketValue <= currentRule.end) {
        valid = true;
      }
      // first check if we are on either end of the rules array
      else if (indexOfRuleToCheck === 0 || indexOfRuleToCheck === rulesArray.length - 1) {
        outOfBounds = true;
      }
      // if it is lower then decrease index
      else if (ticketValue < currentRule.start) {
        indexOfRuleToCheck--;
      }
      // if higher then increase the index - note this could be else but this is safer
      // and more understanble
      else if (ticketValue > currentRule.end) {
        indexOfRuleToCheck++;
      }
    }
    // if the number is not valid then we add it to the invalid numbers array
    if (!valid) {
      invalidNumbers.push(ticketValue);
    }
  });

  return invalidNumbers.reduce((a, b) => a + b, 0);
}

function checkAllTickets(tickets, rulesArray) {
  let sum = 0;
  // sort and set up the rules
  const sortedRules = setUpRules(rulesArray);
  tickets.forEach((ticket) => {
    sum += findInvalidNumbers(ticket, sortedRules);
  });

  return sum;
}

/// //////////////////////////
///                       ////
///         Part 2        ////
///                       ////
/// //////////////////////////

// checks individual ticket if it is valid or not
function checkIfTicketIsValid(ticket, rulesArray) {
  console.log('🚀 ~ file: main.mjs ~ line 149 ~ checkIfTicketIsValid ~ ticket', ticket);
  // we start our rules check in the middle, that way we will at most check half of the rules.
  const startingIndex = Math.floor(rulesArray.length / 2);

  let wholeTicketValid = true;
  for (let i = 0; i < ticket.length; i++) {
    let indexOfRuleToCheck = startingIndex;
    let outOfBounds = false;
    let valid = false;
    const ticketValue = ticket[i];
    while (!outOfBounds && !valid) {
      const currentRule = rulesArray[indexOfRuleToCheck];
      // if the ticket number fits within a rule then it is valid and we can carry on
      if (ticketValue >= currentRule.start && ticketValue <= currentRule.end) {
        valid = true;
      }
      // first check if we are on either end of the rules array
      else if (indexOfRuleToCheck === 0 || indexOfRuleToCheck === rulesArray.length - 1) {
        outOfBounds = true;
      }
      // if it is lower then decrease index
      else if (ticketValue < currentRule.start) {
        indexOfRuleToCheck--;
      }
      // if higher then increase the index - note this could be else but this is safer
      // and more understanble
      else if (ticketValue > currentRule.end) {
        indexOfRuleToCheck++;
      }
    }
    // if the number is not valid then we break and return false
    if (!valid) {
      console.log(ticketValue);
      console.log(ticket);
      wholeTicketValid = false;
      break;
    }
  }

  return wholeTicketValid;
}

function findAllValidTickets(nearbyTickets, rules) {
  const minmizedRules = setUpRules(rules);
  console.log(
    '🚀 ~ file: main.mjs ~ line 183 ~ findAllValidTickets ~ minmizedRules',
    minmizedRules,
  );
  // start by elimnating the unvalid tickets
  const validTickets = [];
  nearbyTickets.forEach((ticket) => {
    if (checkIfTicketIsValid(ticket, minmizedRules)) {
      validTickets.push(ticket);
    }
  });
  console.log('🚀 ~ file: main.mjs ~ line 192 ~ findAllValidTickets ~ validTickets', validTickets);
  return validTickets;
}

function addAllPositionsTogheter(tickets) {
  // create a 2d array
  const allPositions = new Array(tickets[0].length);
  for (let i = 0; i < allPositions.length; i++) {
    allPositions[i] = [];
  }

  tickets.forEach((ticket) => {
    ticket.forEach((value, i) => {
      console.log('🚀 ~ file: main.mjs ~ line 196 ~ ticket.forEach ~ value, i', value, i);
      allPositions[i].push(value);
    });
  });
  console.log(
    '🚀 ~ file: main.mjs ~ line 210 ~ addAllPositionsTogheter ~ allPositions',
    allPositions,
  );
}

function test2(nearbyTickets, myTicket, rules) {
  addAllPositionsTogheter(findAllValidTickets(nearbyTickets, rules));
}

console.log('The answer to Day 16 Part 1 is: ', checkAllTickets(data.nearbyTickets, data.rules)); // 29019 //test 71
console.log(
  'the answer to Day 16 Part 2 is: ',
  test2(test.nearbyTickets, test.myTicket, test.rules),
); // answer2
