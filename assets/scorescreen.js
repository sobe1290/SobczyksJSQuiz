//These are the variables used on the page
var lastScoreContainer = document.getElementById('yourScore');
var highScoresContainer = document.getElementById('highScores');

//This defines the function that will show the last score.
function renderLastScore () {
    var lastScoreContainer = JSON.parse(localStorage.getItem("lastScored"));
    yourScore.innerHTML = `${lastScoreContainer}`;
}

renderLastScore ();

//This defines the function that will display the top scores from local storage.
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

