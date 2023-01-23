var score = 0;
var time = 20;
var intervalId;
var circle;

function startGame() {
  document.getElementById("start-button").style.display = "none";
  document.getElementById("end-game").style.display = "none";
  score = 0;
  time = 20;
  document.getElementById("score").innerHTML = score;
  document.getElementById("time").innerHTML = time;
  intervalId = setInterval(countdown, 1000);
  document.body.style.cursor = "crosshair";
  spawnCircle();
}

function endGame() {
  clearInterval(intervalId);
  document.getElementById("final-score-value").innerHTML = score;
  document.getElementById("end-game").style.display = "block";
  let circle = document.querySelector(".circle");
  let gameArea = document.querySelector("#game-area");
  document.body.style.cursor = "auto";
  gameArea.removeChild(circle);
}

function countdown() {
  time--;
  document.getElementById("time").innerHTML = time;
  if (time === 0) {
    endGame();
  }
}

function spawnCircle() {
  var gameArea = document.getElementById("game-area");
  var x = Math.random() * 80;
  var y = Math.random() * 80;
  circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.left = x + "%";
  circle.style.top = y + "%";
  circle.style.position = "absolute";
  circle.style.width = "10%";
  circle.style.height = "10%";
  circle.style.borderRadius = "50%";
  circle.style.backgroundColor = "red";
  circle.onclick = function() {
    score++;
    document.getElementById("score").innerHTML = score;
    gameArea.removeChild(circle);
    spawnCircle();
  };
  gameArea.appendChild(circle);
}




