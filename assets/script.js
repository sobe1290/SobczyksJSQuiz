//function for the timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

//function to start the timer when quiz.html is loaded
window.onload = function () {
    var tenMinutes = 60 * 10,
        display = document.querySelector('#time');
    startTimer(tenMinutes, display);
};

// need to write a function that makes incorrect answer subtract 30 seconds from timer once I have all the variables made.

// Used the following website as a resource in constructing this quiz: 
// Berhanu Y, Hibbard James, 2020. "How to Make a Simple JavaScript Quiz" sitepoint.com. https://www.sitepoint.com/simple-javascript-quiz/.

function startQuiz(){
    var output = [];
    questionBank.forEach(
        (currentQuestion, questionNumber) => {
            var answers = [];
            for(letter in currentQuestion.answers){
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value=${letter}>
                        ${letter} :
                        ${currentQuestion.answers[letter]}                    
                    </label>`
                );
            }
            output.push(
                `<div class="slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join('')} </div>
                </div>`
            );
        }
    );

    quizElementContainer.innerHTML = output.join('');
}

function showResults(){
    var answerContainers = quizElementContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    questionBank.forEach( (currentQuestion, questionNumber) => {
        var answerContainer = answerContainers[questionNumber];
        var selector = `input[name=question${questionNumber}]:checked`;
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(userAnswer === currentQuestion.correctAnswer){
            userAnswer = answerForTimer;
            currentQuestion.correctAnswer = comparisonAnswerForTimer;
            numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        else{
            answerContainers[questionNumber].style.color = 'red';
        }
        
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${questionBank.length}`;    
}

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}


var quizElementContainer = document.getElementById('quizElement');
var statusContainer = document.getElementById(`status`);
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var questionBank = [
    {
        question: "Number 1 Question?",
        answers: {
            a: "Number 1 Answer 1",
            b: "Number 1 Answer 2",
            c: "Number 1 Answer 3",
            d: "Number 1 Answer 4"
        },
        correctAnswer: "d"
    },
    {
        question: "Number 2 Question?",
        answers: {
            a: "Number 2 Answer 1",
            b: "Number 2 Answer 2",
            c: "Number 2 Answer 3",
            d: "Number 2 Answer 4"
        },
        correctAnswer: "a"
    },
    {
        question: "Number 3 Question?",
        answers: {
            a: "Number 3 Answer 1",
            b: "Number 3 Answer 2",
            c: "Number 3 Answer 3",
            d: "Number 3 Answer 4"
        },
        correctAnswer: "b"
    },
    {
        question: "Number 4 Question?",
        answers: {
            a: "Number 4 Answer 1",
            b: "Number 4 Answer 2",
            c: "Number 4 Answer 3",
            d: "Number 4 Answer 4"
        },
        correctAnswer: "d"
    },
    {
        question: "Number 5 Question?",
        answers: {
            a: "Number 5 Answer 1",
            b: "Number 5 Answer 2",
            c: "Number 5 Answer 3",
            d: "Number 5 Answer 4"
        },
        correctAnswer: "c"
    },
    {
        question: "Number 6 Question?",
        answers: {
            a: "Number 6 Answer 1",
            b: "Number 6 Answer 2",
            c: "Number 6 Answer 3",
            d: "Number 6 Answer 4"
        },
        correctAnswer: "d"
    },
    {
        question: "Number 7 Question?",
        answers: {
            a: "Number 7 Answer 1",
            b: "Number 7 Answer 2",
            c: "Number 7 Answer 3",
            d: "Number 7 Answer 4"
        },
        correctAnswer: "a"
    },
    {
        question: "Number 8 Question?",
        answers: {
            a: "Number 8 Answer 1",
            b: "Number 8 Answer 2",
            c: "Number 8 Answer 3",
            d: "Number 8 Answer 4"
        },
        correctAnswer: "b"
    },
    {
        question: "Number 9 Question?",
        answers: {
            a: "Number 9 Answer 1",
            b: "Number 9 Answer 2",
            c: "Number 9 Answer 3",
            d: "Number 9 Answer 4"
        },
        correctAnswer: "a"
    },
    {
        question: "Number 10 Question?",
        answers: {
            a: "Number 10 Answer 1",
            b: "Number 10 Answer 2",
            c: "Number 10 Answer 3",
            d: "Number 10 Answer 4"
        },
        correctAnswer: "c"
    }
];

startQuiz();

const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(currentSlide);

function showNextSlide() {

    var answerContainers = quizElementContainer.querySelectorAll('.answers');
    questionBank.forEach( (currentQuestion, questionNumber) => {
        var answerContainer = answerContainers[questionNumber];
        var selector = `input[name=question${questionNumber}]:checked`;
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(userAnswer === currentQuestion.correctAnswer){
            statusContainer.innerHTML = `Correct!`;
        }
        else{
            statusContainer.innerHTML = `Incorrect! Minus 30 Seconds from Timer`;
        }
        
    });



    setTimeout(function() {
    nextButton.style.display = 'hidden';
    showSlide(currentSlide + 1);}, 3000);
    
  }
  


submitButton.addEventListener('click', showResults);
nextButton.addEventListener("click", showNextSlide);

