




var lastScoreContainer = document.getElementById('yourScore');
var highScoresContainer = document.getElementById('highScores');

function renderLastScore () {
    var lastScoreContainer = JSON.parse(localStorage.getItem("lastScored"));
    yourScore.innerHTML = `${lastScoreContainer}`;
}

renderLastScore ();

function renderHighScores () {
    let highScores = JSON.parse(localStorage.getItem("customScore"));
    if(highScores == null) highScores = [];
    let highScoresList = '';
    highScores.forEach(customScore => {
        highScoresList = highScoresList + '<p>' + customScore.initials + ' : ' + customScore.userscore + '</p>';
    });
    highScoresContainer.innerHTML = highScoresList;
}

renderHighScores ();


// var lastScoreContainer = JSON.parse(localStorage.getItem("customScore"));
// let lastScore =lastScoreContainer
// yourScore.innerHTML = `${lastScoreContainer.value}`;