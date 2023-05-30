// PASTE AND RUN THIS IN CHROME CONSOLE (F12 or CTRL + SHIFT + J)
var scriptTag = Array.from(document.getElementsByTagName('script')).find((script) =>
  script.innerHTML.includes('var qa_array')
);
var match = scriptTag.innerHTML.match(/var qa_array = ({.*?});/);
var qa_array = match ? eval('(' + match[1] + ')') : {};

// Get all the question wrappers on the page
var questionWrappers = document.getElementsByClassName('question-wrapper');

var currentIndex = 0;

function processNextQuestion() {
  var questionWrapper = questionWrappers[currentIndex];

  // Get the question ID
  var questionId = parseInt(questionWrapper.querySelector('.question').id);

  // Get the question text
  var questionText = questionWrapper.querySelector('.question-text').textContent.trim();

  // Check if the question ID is present in the question-answer map
  if (qa_array.hasOwnProperty(questionId)) {
    // Get the answer ID 
    var answerId = qa_array[questionId];
    var answerOption = questionWrapper.querySelector('.qns[val="' + answerId + '"]');

    if (answerOption) {
      // Get answer text
      var answerText = answerOption.querySelector('.question-option').textContent.trim();

      // Output for visual
      console.log('Question: ' + questionText);
      console.log('Answer: ' + answerText);
      console.log('---');

      // click event on answer option
      answerOption.click();
    }
  }
  // Move to the next question
  currentIndex++;
  if (currentIndex >= questionWrappers.length) {
    currentIndex = 0;
  }
}
// Delay interval
var intervalId = setInterval(processNextQuestion, 3000);
