const countdown = document.getElementById("countdown");
const gameArea = document.getElementById("game-area");
const startButton = document.getElementById("start-button");
const score = document.getElementById("score");

document.getElementById("end-game").style.display = "none";

let clicks = 0;
let timeLeft = 10;
let intervalId;
let gameStarted = false;

gameArea.addEventListener("click", function() {
  if (!gameStarted || timeLeft === 0) return;
  clicks++;
  score.innerHTML = `Score: ${clicks}`;
});

startButton.addEventListener("click", function() {
  startButton.style.display = "none";
  counter.innerHTML = "3";
  setTimeout(function() {
    counter.innerHTML = "2";
  }, 1000);
  setTimeout(function() {
    counter.innerHTML = "1";
  }, 2000);
  setTimeout(function() {
    gameStarted = true;
    counter.innerHTML = "GO!";
    countdown.innerHTML = `Time remaining: ${timeLeft}`;
    intervalId = setInterval(function() {
      timeLeft--;
      counter.innerHTML = "";
      countdown.innerHTML = `Time remaining: ${timeLeft}`;
      if (timeLeft === 0) {
        clearInterval(intervalId);
        countdown.innerHTML = `Time's up! Final score: ${clicks}`;
        document.getElementById("final-score-value").innerHTML = clicks;
        document.getElementById("end-game").style.display = "block";
        document.getElementById("play-again-button").addEventListener("click", playAgain);
      }
    }, 1000);
  }, 3000);
});

function playAgain() {
    document.getElementById("end-game").style.display = "none";
    clicks = 0;
    timeLeft = 10;
    gameStarted = false;
    score.innerHTML = "Score: 0";
    countdown.innerHTML = `Time remaining: ${timeLeft}`;
    startButton.style.display = "inline-block";
}

function displaySubmit()