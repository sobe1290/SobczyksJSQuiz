//This section controls the timer
const timerElement = document.getElementById('time');
let timeLeft = 300;
let score = 0;

function startTimer() {
    timerElement.textContent = timeLeft;
    let timerInterval = setInterval( () => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showResults();
            }
        }, 1000);
};

startTimer();

//This section builds the quiz slideshow upon calling startQuiz
function startQuiz(){
    initialsBox.style.display = 'none';
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

//This section defines how the quiz ends.
function showResults(){
    quizElementContainer.style.display = 'none';
    initialsBox.style.display = 'inline-block';
    var answerContainers = quizElementContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    questionBank.forEach( (currentQuestion, questionNumber) => {
        var answerContainer = answerContainers[questionNumber];
        var selector = `input[name=question${questionNumber}]:checked`;
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(userAnswer === currentQuestion.correctAnswer){
            numCorrect++;
        }        
    });

    resultsContainer.innerHTML = `Final Score ${score}: ${numCorrect} out of ${questionBank.length} correct`;  
    submitButton.style.display = 'none';  
    topScoresButton.style.display = 'none';
    nextButton.style.display = 'none';
}

//This section defines the behavior of moving to the next question.
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

//These are variables that are used for functionality of the quiz slideshow.
var topScoresButton = document.getElementById('scorePage');
var quizElementContainer = document.getElementById('quizElement');
var statusContainer = document.getElementById(`status`);
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

//These are the questions used in the quiz.
var questionBank = [
    {
        question: "Which of these is NOT a primitive data type?",
        answers: {
            a: "String",
            b: "Number",
            c: "Boolean",
            d: "Function"
        },
        correctAnswer: "d"
    },
    {
        question: "Which method would convert letters to lowercase?",
        answers: {
            a: ".toLowerCase();",
            b: ".fontReduce();",
            c: ".fontSmaller();",
            d: ".toSmallAlpha();"
        },
        correctAnswer: "a"
    },
    {
        question: "Which of the following is not a valid operator?",
        answers: {
            a: "+",
            b: "=^",
            c: "*=",
            d: "**="
        },
        correctAnswer: "b"
    },
    {
        question: "What does JSON stand for?",
        answers: {
            a: "JavaScript Orphan Notation",
            b: "Javascript Object Normalization",
            c: "JavaScript Orphan Normalization",
            d: "JavaScript Object Notation"
        },
        correctAnswer: "d"
    },
    {
        question: "Which of these variables would result in an error?",
        answers: {
            a: "var myVar = x",
            b: "let myVar = x",
            c: "set myVar = x",
            d: "const myVar =x"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the keyword required when declaring a function?",
        answers: {
            a: "Parameter",
            b: "Return",
            c: "Argument",
            d: "Function"
        },
        correctAnswer: "d"
    },
    {
        question: "Which of these is not a valid conditional?",
        answers: {
            a: "Else then",
            b: "If",
            c: "Else",
            d: "Else if"
        },
        correctAnswer: "a"
    },
    {
        question: "What are the values inside arrays called?",
        answers: {
            a: "Variables",
            b: "Elements",
            c: "List Items",
            d: "Objects"
        },
        correctAnswer: "b"
    },
    {
        question: "What is it called when declarations are moved to the top?",
        answers: {
            a: "Hoisting",
            b: "Elevating",
            c: "Rooting",
            d: "Lifting"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the word for a function when it is stored as a property within a JS Object?",
        answers: {
            a: "Variable",
            b: "Element",
            c: "Method",
            d: "Array"
        },
        correctAnswer: "c"
    }
];

var correctAnswerArray = ["d", "a", "b", "d", "c", "d", "a", "b", "a", "c"];

startQuiz();

const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(currentSlide);

//This section defines the funtion of moving to the next question.

function showNextSlide() {
    var answerContainers = quizElementContainer.querySelectorAll('.answers');
    var currentSlideAnswer = correctAnswerArray[currentSlide];    
    var answerContainer = answerContainers[currentSlide];
    var selector = `input[name=question${currentSlide}]:checked`;
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;
    if(userAnswer == currentSlideAnswer){
        statusContainer.innerHTML = `Correct!`;
        score += 99;
        setTimeout(function() {
            statusContainer.innerHTML = ``}, 1000);
    }
    else{
        statusContainer.innerHTML = `Incorrect! Minus 30 Seconds from Timer`;
        timeLeft -= 30;
        setTimeout(function() {
            statusContainer.innerHTML = ``}, 1000);            
    }
    document.getElementById("next").style.display="none"; 
    setTimeout(function() {
        document.getElementById("next").style.display="show";;
        showSlide(currentSlide + 1);}, 1000);    
}

//This section defines how a user will submit their score and initials to local storage
var submitInitialsButton = document.getElementById('submitInitials');
var userInitials = document.getElementById('initials');
submitInitialsButton.addEventListener('click', function(event) {
    event.preventDefault();    
    let highScores = JSON.parse(localStorage.getItem("customScore"));
    if(highScores == null) highScores = [];
    highScores.push({initials: userInitials.value, userscore: score});
    highScores.sort((curr, next) => {
        if (curr.userscore < next.userscore) {
        return 1
    } else if (curr.userscore > next.userscore) {
        return -1
    } else {
        return 0}
});

    localStorage.setItem("customScore", JSON.stringify(highScores));
    localStorage.setItem("lastScored", JSON.stringify(score));
    window.location.href= "../html/scorescreen.html";

});

submitButton.addEventListener('click', showResults);
nextButton.addEventListener("click", showNextSlide);

