import data from './data.mjs';

// returns the number of unique characters in a string
function findUniques(questions) {
  return new Set(questions).size;
}

// create question string
function createQuestionString(questions) {
  let questionString = '';
  questions.forEach((question) => {
    questionString += question;
  });
  return questionString;
}

/// //////////////////////////
///                       ////
///         Part 1        ////
///                       ////
/// //////////////////////////

function findQuestionNumber(questions) {
  let count = 0;
  let questionLines = [];
  questions.forEach((question) => {
    if (question !== '') {
      questionLines.push(question);
    } else {
      count += findUniques(createQuestionString(questionLines));
      questionLines = [];
    }
  });

  return count;
}

/// //////////////////////////
///                       ////
///         Part 2        ////
///                       ////
/// //////////////////////////

// check if all users answered yes to the same wuestion
function findUniquesAll(questions, users) {
  const questionObject = {};
  let count = 0;
  for (let i = 0; i < questions.length; i++) {
    questionObject[questions[i]] = 1 + (questionObject[questions[i]] || 0);
  }
  // eslint-disable-next-line no-unused-vars
  for (const [key, value] of Object.entries(questionObject)) {
    count += value === users ? 1 : 0;
  }
  return count;
}

function findQuestionNumberAll(questions) {
  let count = 0;
  let questionLines = [];
  questions.forEach((question) => {
    if (question !== '') {
      questionLines.push(question);
    } else {
      count += findUniquesAll(createQuestionString(questionLines), questionLines.length);
      questionLines = [];
    }
  });

  return count;
}

console.log('The answer to Day 6 Part 1 is: ', findQuestionNumber(data)); // 6686
console.log('the answer to Day 6 Part 2 is: ', findQuestionNumberAll(data)); // 3476
