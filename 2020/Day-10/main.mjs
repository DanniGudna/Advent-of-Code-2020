import data from './data.mjs';

/// //////////////////////////
///                       ////
///         Part 1        ////
///                       ////
/// //////////////////////////

function sortNumbers(numArray) {
  return numArray.sort((a, b) => a - b);
}

function countJoltDiffrences(jolts) {
  let oneJolt = 0;
  let threeJolt = 0;
  let lastJolt = 0;
  const sorted = sortNumbers(jolts);

  sorted.push(sorted[sorted.length - 1] + 3);
  sorted.forEach((adapter) => {
    if (adapter === lastJolt + 3) {
      threeJolt++;
    } else if (adapter === lastJolt + 1) {
      oneJolt++;
    }
    lastJolt = adapter;
  });
  return oneJolt * threeJolt;
}

/// //////////////////////////
///                       ////
///         Part 2        ////
///                       ////
/// //////////////////////////

// number of paths equals a tripled fibonnaci.
// i.e the next number is the sum of the three previous numbers.
// So if we start with  1 then we get the first three numbers
// as 1 1 2. (1, 1, 1+1 ). WE can then generate the next numbers as needed
function generateTribonnaciSequence(desiredLength) {
  const fibSequence = [1, 1, 1, 2]; // add an extra one so the pointers point correctly
  while (fibSequence.length < desiredLength) {
    fibSequence.push(
      fibSequence[fibSequence.length - 1] +
        fibSequence[fibSequence.length - 2] +
        fibSequence[fibSequence.length - 3],
    );
  }
  return fibSequence;
}

// finds the longest subgraph so we know how long we have to make our fibonnaci sequence
function generateSubGraph(adapters) {
  let longestGraph = 0;
  let currentGraph = 1; // start at one since it should count the path connecting the subgraphs
  const graphs = [];
  let lastJolt = 0;
  const sortedAdapters = sortNumbers(adapters);
  sortedAdapters.forEach((adapter) => {
    // if the diffrence is three then it is the end of the current subgraph
    if (adapter === lastJolt + 3) {
      // check if new longest path
      if (currentGraph > longestGraph) {
        longestGraph = currentGraph;
      }
      // add length to graph array
      graphs.push(currentGraph);
      currentGraph = 1;
    } else if (adapter === lastJolt + 1) {
      currentGraph++;
    }
    lastJolt = adapter;
  });
  // check the last piece in case it doesnt end with a 3
  if (currentGraph > longestGraph) {
    longestGraph = currentGraph;
  }
  // it is save to add it here, if it ends with 3 then it will be a one and inconsiquential
  graphs.push(currentGraph);
  return { Graphs: graphs, LongestGraph: longestGraph };
}

function findAllPaths(adapters) {
  let total = 1;
  const graphs = generateSubGraph(adapters);
  // add one to the longest graph so pointers match
  const fib = generateTribonnaciSequence(graphs.LongestGraph + 1);
  graphs.Graphs.forEach((graph) => {
    total *= fib[graph];
  });
  return total;
}

console.log('The answer to Day 10 Part 1 is: ', countJoltDiffrences(data)); // 3000
console.log('the answer to Day 10 Part 2 is: ', findAllPaths(data)); // 193434623148032
