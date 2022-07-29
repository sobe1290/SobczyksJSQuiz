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

var correctAnswerArray = ["d", "a", "b", "d", "c", "d", "a", "b", "a", "c"];

startQuiz();

const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;




showSlide(currentSlide);


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


var submitInitialsButton = document.getElementById('submitInitials');

function sendInitials () {
    let playerInitials = submitInitialsButton.value;
    
}


submitButton.addEventListener('click', showResults);
nextButton.addEventListener("click", showNextSlide);

