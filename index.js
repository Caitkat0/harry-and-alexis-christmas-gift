"use strict";

let questionNumber = 0;
let score = 0;

//questions bank object
var questionBank = [
    {//question 1
      question: "In Blizzard's digital card game Hearthstone, which of these is not a featured class?",
      answers: ['Druid',
                'Hunter',
                'Monk',
                'Paladin'],
      correctAnswer: 'Monk'
    },
    {//question 2
      question: "What is James' middle name?",
      answers: ['Joshua',
                'Francis', 
                'Bello', 
                'Garol'],
      correctAnswer: 'Garol'
    },
    {//question 3
      question: 'You go to a pizza place. A small pizza is 9 inches in diameter, a medium is 12 inches and a large is 18. How do you get the most amount of pizza with the money you have?',
      answers: ['Order 1 Large pizza pie',
                'Order 2 Medium pizza pies', 
                'Order 3 Small pizza pies', 
                'Order 1 Medium pizza pie then you call back and say that the 1st pie never came. '],
      correctAnswer: 'Order 1 Large pizza pie'
    },
    {//question 4
      question: 'What planet is Mos Eisley found on?',
      answers: ['Yavin 4',
                'Endor',
                'Tatooine',
                'Naboo'],
      correctAnswer: 'Tatooine'
    },
    {//question 5
      question: 'Which one of these shoes has NOT been showcased in a movie?',
      answers: ['Yeezy 350 Boost',
                'Air Jordan 11 "Space Jam"',
                'Nike "Air Mag"',
                'PF Flyers'],
      correctAnswer: 'Yeezy 350 Boost'
    },
    {//question 6
      question: 'The Javascript library "React" was created by whom?',
      answers: ['Google',
                'Facebook',
                'Microsoft',
                'Elon Musk'],
      correctAnswer: 'Facebook'
    },
    {//question 7
      question: 'How do you pronounce this: S-S-S-T?',
      answers: ['ssst',
                'zzzt',
                'ssssst but in a filipino accent', 
                'forest'],
      correctAnswer: 'forest'
    },
    {//question 8
      question: 'An old woman has 7 sons, each of the sons has a sister. How many children does she have?',
      answers: ['7',
                '8',
                '14',
                'None of the above'],
      correctAnswer: '8'
    },
    {//question 9
      question: 'What is the state motto of Texas?',
      answers: ['Dont Tread On Me',
                'Remember the Alamo', 
                'Friendship',
                'We are the Lone Star State'],
      correctAnswer: 'Friendship'
    },
    {//question 10
      question: 'Which of these has not been featured as an answer to any of the previous questions?',
      answers: ['Forest Moon of Endor',
                '14',
                'Google',
                'None of the Above'],
      correctAnswer: 'Forest Moon of Endor'
    }];

    
//generate question html
function generateQuestion() {
  if (questionNumber < questionBank.length) {
    return `<div class="question-${questionNumber}">
    <h2>${questionBank[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${questionBank[questionNumber].answers[0]}" name="answer" required>
    <span>${questionBank[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${questionBank[questionNumber].answers[1]}" name="answer" required>
    <span>${questionBank[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${questionBank[questionNumber].answers[2]}" name="answer" required>
    <span>${questionBank[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${questionBank[questionNumber].answers[3]}" name="answer" required>
    <span>${questionBank[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
  } else {
      renderResults();
      restartQuiz();
      $('.questionNumber').text(10)
      }
    }
    
//increment question number
function changeQuestionNumber() {
  //if (questionNumber < questionBank.length) {
    questionNumber++;
  //}
    $('.questionNumber').text(questionNumber + 1);
  }
    
//increment score
  function changeScore() {
    score++;
  }
    
//start quiz
//on startQuizButton click hide start div
//unhide quiz form div
function startQuiz() {
	$('.startButton').click(function (event) {
		console.log('clicked');
		$('.quizIntro').css('display', 'none');
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
  });
  }
    
// render question in DOM
function renderQuestion() {
  $('.questionAnswerForm').html(generateQuestion());
}
    
//user selects answer on submit run user feedback
function userSelectAnswer() {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${questionBank[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
        selected.parent().addClass('wrong');
        ifAnswerIsWrong();
        }
      });
    }
    
function ifAnswerIsCorrect() {
    userAnswerFeedbackCorrect();
    updateScore();
}
    
function ifAnswerIsWrong() {
  userAnswerFeedbackWrong();
}
    
//user feedback for correct answer
function userAnswerFeedbackCorrect() {
  let correctAnswer = `${questionBank[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"></div><p><b>Very well a correct answer for you.</b></p><button type=button class="nextButton">Shall we keep going?</button></div>`);
}
    
//user feedback for wrong answer
function userAnswerFeedbackWrong() {
  let correctAnswer = `${questionBank[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"></div><p>That is incorrect. You're going to have to try a little harder on the next one.</p><button type=button class="nextButton">Try to not get the next one wrong.</button></div>`);
}
    
//update score text
function updateScore() {
  changeScore();
  $('.score').text(score);
}
    
//when quiz is over this is the html for the page
function renderResults() {
  if (score >= 8) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Congratulations. Here is your <a href="prize.pdf" target="_blank"><strong>PRIZE</strong></a>!</h3><img src="images/christmas.png" alt="christmas card" class="results-pic"/><p>You got ${score} / 10</p><p>I hope you didn't waste too much time on this. Until next time :) Merry Christmas!</p><button class="restartButton">Restart</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Almost there..... But almost only counts for horsehoes and hand grenades. </h3><img src="https://static.wixstatic.com/media/59cd40_56d9c2c18e054e5885d106dbe5e58883~mv2.jpeg/v1/fill/w_600,h_799,al_c,lg_1,q_85/59cd40_56d9c2c18e054e5885d106dbe5e58883~mv2.webp" alt="rope with 1 thread left" class="results-pic" /><p>Your score is ${score} / 10</p><p>Try a little harder next time</p><button class="restartButton">Another go shall we?</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You failed. Horribly.</h3><img src="https://miro.medium.com/max/4000/1*BPO-L9NdiihKFMmSKzRf7Q.jpeg" alt="sad person on lake" class="results-pic" /><p>Only ${score} / 10</p><p>You should rethink your life decisons</p><button class="restartButton">Want to fail again?</button></div>`);
  }
}
    
//what happens when the user clicks next
function renderNextQuestion() {
  $('main').on('click', '.nextButton', function (event) {
      changeQuestionNumber();
      renderQuestion();
      userSelectAnswer();
  });
}
    
//restart quiz function - reloads page to start quiz over
function restartQuiz() {
  $('main').on('click', '.restartButton', function (event) {
  location.reload();
      });
}
    
//run quiz functions
function handleQuiz() {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}
    
$(handleQuiz);
    
