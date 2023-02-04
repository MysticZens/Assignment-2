const countdown = document.getElementById("countdown");
const gameArea = document.getElementById("game-area");
const startButton = document.getElementById("start-button");
const score = document.getElementById("score");

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
  countdown.innerHTML = "Time remaining: 3";
  setTimeout(function() {
    countdown.innerHTML = "Time remaining: 2";
  }, 1000);
  setTimeout(function() {
    countdown.innerHTML = "Time remaining: 1";
  }, 2000);
  setTimeout(function() {
    gameStarted = true;
    countdown.innerHTML = `Time remaining: ${timeLeft}`;
    intervalId = setInterval(function() {
      timeLeft--;
      countdown.innerHTML = `Time remaining: ${timeLeft}`;
      if (timeLeft === 0) {
        clearInterval(intervalId);
        countdown.innerHTML = `Time's up! Final score: ${clicks} <br> <button id="play-again">Play Again</button>`;
        document.getElementById("play-again").addEventListener("click", playAgain);
      }
    }, 1000);
  }, 3000);
});

function playAgain() {
  clicks = 0;
  timeLeft = 10;
  gameStarted = false;
  score.innerHTML = "Score: 0";
  countdown.innerHTML = `Time remaining: ${timeLeft}`;
  startButton.style.display = "inline-block";
}