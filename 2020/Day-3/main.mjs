import { data, lineLength, slopesToTry } from './data.mjs';

function isTree(line, index) {
  if (line[index] === '#') {
    return 1;
  }
  return 0;
}

/*   function isDRAW(line, index) {
    let aline = line;
    if (line[index] === "#") {
      aline[index] = 'X';
    } else {
      aline[index] = 'O'
    }
    console.log(aline);
  } */

function addAndClamp(index, add) {
  return (index + add) % lineLength;
}

/* function slideDown(slope, right, down) {
  let treeCounter = 0;
  let index = 0;
  slope.forEach((line) => {
    index = addAndClamp(index, 7);
    treeCounter += isTree(line, index);
  });
  return treeCounter;
} */

function slideDown(map, right, down) {
  let treeCounter = 0;
  let index = 0;
  let lane = 0;
  map.forEach((line) => {
    lane++;
    if (lane % down === 0) {
      index = addAndClamp(index, right);
      treeCounter += isTree(line, index);
    }
  });
  return treeCounter;
}

function multipleSlides(map, slopes) {
  let answer = 1;
  slopes.forEach((slope) => {
    answer *= slideDown(map, slope.Right, slope.Down);
  });
  return answer;
}

console.log('The answer to Day 3 Part 1 is: ', slideDown(data, 3, 1));
console.log(
  'the answer to Day 3 Part 2 is: ',
  multipleSlides(data, slopesToTry),
);
