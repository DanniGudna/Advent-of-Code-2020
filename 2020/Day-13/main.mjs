import { data, arrivalTime, x } from './data.mjs';

/// //////////////////////////
///                       ////
///         Part 1        ////
///                       ////
/// //////////////////////////

function findNextBus(buses, arrival) {
  let lowestTime = Infinity;
  let busId;
  buses.forEach((bus) => {
    if (bus !== x) {
      const timeToThisBus = bus - (arrival % bus);
      if (timeToThisBus < lowestTime) {
        lowestTime = timeToThisBus;
        busId = bus;
      }
    }
  });
  return lowestTime * busId;
}

/// //////////////////////////
///                       ////
///         Part 2        ////
///                       ////
/// //////////////////////////

// We need to find the number for each 2 buses and then continue in steps
//  equal to the least common multiple of those buses
function findBusSequence(buses) {
  let currentLocation = buses[0];
  let difference = 1; // number of minutes from last bus that the next bus should arrive in
  let interval = buses[0];

  for (let i = 1; i < buses.length; i++) {
    const bus = buses[i];
    if (bus === x) {
      difference++;
    } else {
      // increase the currenLocation by the interval until we find a time that fits
      while ((currentLocation + difference) % bus !== 0) {
        currentLocation += interval;
      }

      // set a new interval that matches the current pattern of found buses
      // note we should set it as equal to the lowest common multiple but since we are
      // dealing with prime numbers then we can just multiply the values
      interval *= bus;
      difference++;
    }
  }
  return currentLocation;
}

console.log('The answer to Day 13 Part 1 is: ', findNextBus(data, arrivalTime)); // 370
console.log('the answer to Day 13 Part 2 is: ', findBusSequence(data)); // 894954360381385
