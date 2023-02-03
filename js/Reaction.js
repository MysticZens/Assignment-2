const gameArea = document.getElementById("gameArea");
const startBtn = document.getElementById("startBtn");
const result = document.getElementById("result");
const time = document.getElementById("time");
const message = document.getElementById("message");
document.getElementById("result").style.display = "none";
document.getElementById("end-game").style.display = "none";
document.getElementById("submission-menu").style.display = "none";

let startTime;
let intervalId;
let clickCount = 0;
let totalTime = 0;
let gameStarted = false;

gameArea.addEventListener("click", function() {
  if (gameStarted && gameArea.style.backgroundColor === "red") {
    document.getElementById("result").style.display = "none";
    message.innerHTML = "You clicked too early!";
    message.classList.remove("hidden");
    clearTimeout(intervalId);
    gameStarted = false;
    clickCount = 0;
    totalTime = 0;
    startBtn.style.display = "inline";
  } else if (gameArea.style.backgroundColor === "green") {
    let endTime = new Date().getTime();
    clickCount++;
    totalTime += endTime - startTime;
    time.innerHTML = (totalTime / clickCount).toFixed(2);
    gameArea.style.backgroundColor = "red";
    clearTimeout(intervalId);
    message.classList.add("hidden");
    if (clickCount < 1) {
      intervalId = setTimeout(startGame, Math.random() * 5000 + 1000);
    } else {
      gameStarted = false;
      document.getElementById("end-game").style.display = "block";
      document.getElementById("result").style.display = "none";
      document.getElementById("final-score-value").innerHTML = time.innerHTML;
    }
  }
});

function start() {
  document.getElementById("end-game").style.display = "none";
  document.getElementById("result").style.display = "block";
  startBtn.style.display = "none";
  clickCount = 0;
  totalTime = 0;
  time.innerHTML = "0";
  message.classList.add("hidden");
  gameStarted = true;
  intervalId = setTimeout(startGame, Math.random() * 5000 + 1000);
}

function reshow(){
  document.getElementById("end-game").style.display = "none";
  document.getElementById("startBtn").style.display = "block";
}

function startGame() {
  startTime = new Date().getTime();
  gameArea.style.backgroundColor = "green";
}

function displaySubmit(){
  document.getElementById("final-score-values").innerHTML = time.innerHTML;
  document.getElementById("end-game").style.display = "none";
  document.getElementById("submission-menu").style.display = "block";
}

function cancelSubmit(){
  document.getElementById("end-game").style.display = "block";
  document.getElementById("submission-menu").style.display = "none";
}
startBtn.style.display = "inline";
gameArea.style.backgroundColor = "red";

