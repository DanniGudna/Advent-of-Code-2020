import { data, lineLength, slopesToTry, TREE } from './data.mjs';

/**
 * checks if the given index of the given string contains TREE ('#')
 *
 * @param {string} line the string to check
 * @param {int} index index of the string to check
 *
 * @return {1,0} returns 1 if it is a tree otherwise it returns 0
 */
function isTree(line, index) {
  return line[index] === TREE ? 1 : 0;
}

/**
 *  clamps and loops the index depending on linelength
 *
 * @param {int} index current index location
 * @param {int} add how much to increment the index location
 * @param {int} length the length of the string
 *
 * @return {int} returns the new index location
 */
function addAndClamp(index, add, length) {
  return (index + add) % length;
}

/**
 *
 * @param {[string]} map an array of strings
 * @param {int} right how much should be added to the index with each pass
 * ( how much the slope goes to the right )
 * @param down which lines to skip, calculated by modulation (how much the slope goes down)
 *
 * @return treeCounter = number of trees found
 */
function slideDown(map, right, down) {
  let treeCounter = 0;
  let index = 0;
  let lane = 0;
  map.forEach((line) => {
    lane++;
    if (lane % down === 0) {
      index = addAndClamp(index, right, lineLength);
      treeCounter += isTree(line, index);
    }
  });
  return treeCounter;
}

/**
 *
 * @param {[string]} map an array of strings
 * @param {[{Right: {int}, Down: {int}}]}slopes an array of slopes to try
 *
 * @return {int} returns the number of trees found for each slope mulitplied together
 */
function multipleSlides(map, slopes) {
  let answer = 1;
  slopes.forEach((slope) => {
    answer *= slideDown(map, slope.Right, slope.Down);
  });
  return answer;
}

console.log('The answer to Day 3 Part 1 is: ', slideDown(data, 3, 1)); // 272
console.log('the answer to Day 3 Part 2 is: ', multipleSlides(data, slopesToTry)); // 3898725600
