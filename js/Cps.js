const startBtn = document.getElementById("startBtn");
const timer = document.getElementById("timer");
const gameArea = document.getElementById("gameArea");
const countdown = document.getElementById("countdown");
const result = document.getElementById("result");

let clicks = 0;
let count = 10;
let intervalId;

startBtn.addEventListener("click", startCountdown);
gameArea.addEventListener("click", countClicks);

function startCountdown() {
  startBtn.style.display = "none";
  countDown(3, startGame);
}

function countDown(seconds, callback) {
  let count = seconds;
  countdown.innerHTML = count;
  intervalId = setInterval(function() {
    count--;
    countdown.innerHTML = count;
    if (count === 0) {
      clearInterval(intervalId);
      countdown.innerHTML = "";
      callback();
    }
  }, 1000);
}

function startGame() {
  intervalId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  count--;
  timer.innerHTML = "Time left: " + count + " seconds";
  if (count === 0) {
    clearInterval(intervalId);
    gameArea.removeEventListener("click", countClicks);
    result.innerHTML = "Total clicks: " + clicks;
  }
}

function countClicks() {
  clicks++;
  result.innerHTML = "Total clicks: " + clicks;
}
