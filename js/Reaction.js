const gameArea = document.getElementById("gameArea");
const startBtn = document.getElementById("startBtn");
const result = document.getElementById("result");
const time = document.getElementById("time");
const message = document.getElementById("message");

let startTime;
let intervalId;
let clickCount = 0;
let totalTime = 0;

gameArea.addEventListener("click", function() {
  if (gameArea.style.backgroundColor === "green") {
    let endTime = new Date().getTime();
    clickCount++;
    totalTime += endTime - startTime;
    time.innerHTML = (totalTime / clickCount).toFixed(2);
    gameArea.style.backgroundColor = "red";
    clearTimeout(intervalId);
    message.classList.add("hidden");
    if (clickCount < 5) {
      intervalId = setTimeout(startGame, Math.random() * 5000 + 1000);
    } else {
      startBtn.style.display = "inline";
    }
  } else {
    message.innerHTML = "You clicked too early!";
    message.classList.remove("hidden");
    clearTimeout(intervalId);
    clickCount = 0;
    totalTime = 0;
    startBtn.style.display = "inline";
  }
});

startBtn.addEventListener("click", function() {
  startBtn.style.display = "none";
  clickCount = 0;
  totalTime = 0;
  time.innerHTML = "0";
  message.classList.add("hidden");
  intervalId = setTimeout(startGame, Math.random() * 5000 + 1000);
});

function startGame() {
  startTime = new Date().getTime();
  gameArea.style.backgroundColor = "green";
}

startBtn.style.display = "inline";
gameArea.style.backgroundColor = "red";