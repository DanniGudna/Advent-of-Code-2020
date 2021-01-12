import data from './data.mjs';

let count = -1; // start in negative one since we count the shiny gold bag as well

/// //////////////////////////
///                       ////
///         Part 1        ////
///                       ////
/// //////////////////////////

// get bag name
function getBagName(rule) {
  return rule.split(' ').slice(0, 2).join(' ');
}

// create the new rules
function addBagsToRuleArray(rule, arrayOfBags) {
  arrayOfBags.forEach((bag) => {
    rule.push(getBagName(bag));
  });
  return rule;
}

// check if rule contains bag Name
function containsBag(rule, arrayOfBags) {
  const cloneArrayOfBags = [...arrayOfBags];
  const containBags = [];
  let newRule = false;
  cloneArrayOfBags.forEach((bag) => {
    if (rule.some((r) => bag.includes(r))) {
      newRule = true;
      count++;
      // add this bag to the containsBags so it can be added to the rules for the next run
      containBags.push(bag);
      // remove this bag from the array since we do not need to check on it again.
      cloneArrayOfBags.splice(cloneArrayOfBags.indexOf(bag), 1);
    }
  });

  if (newRule) {
    return containsBag(addBagsToRuleArray(rule, containBags), cloneArrayOfBags);
  }
  return count;
}

function howManyCanContain(bagRules, bag) {
  return containsBag([bag], bagRules);
}

/// //////////////////////////
///                       ////
///         Part 2        ////
///                       ////
/// //////////////////////////

// create an array with all the rules for the bag
function getRules(rule) {
  // const key = rule.split(' ').slice(0,2).join(' ');
  const bagArray = [];
  const bags = rule.split('contain ')[1];
  // if empty return empty array
  if (bags === 'no other bags.') {
    return bagArray;
  }
  const splitBags = bags.split(', ');
  splitBags.forEach((bag) => {
    bagArray.push([bag.split(' ').slice(1, 3).join(' '), parseInt(bag[0], 10)]);
  });
  return bagArray;
}

// create an object with bag name and the rules.
function createBagObject(bagRules) {
  const bagObject = {};
  bagRules.forEach((bag) => {
    const key = bag.split(' ').slice(0, 2).join(' ');
    bagObject[key] = getRules(bag);
  });
  return bagObject;
}

// recursion, remove line with bag&rule and add 1 and add others to array.
// call the same function with everything in the array repeat untill array is empty on all accounts.
function countBags(bagToCheck, bagObject) {
  let localBagCounter = 0;
  if (bagToCheck.length === 0) {
    return 0;
  }
  bagToCheck.forEach((bag) => {
    localBagCounter += bag[1];
    localBagCounter += countBags(bagObject[bag[0]], bagObject) * bag[1];
  });
  return localBagCounter;
}

function howManyBagsRequired(bagRules, startBag) {
  const bagObject = createBagObject(bagRules);
  return countBags(bagObject[startBag], bagObject);
}

console.log('The answer to Day 7 Part 1 is: ', howManyCanContain(data, 'shiny gold')); // 265
console.log('the answer to Day 7 Part 2 is: ', howManyBagsRequired(data, 'shiny gold')); // 14177
