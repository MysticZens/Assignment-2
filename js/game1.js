var score = 0;
var time = 20;
var intervalId;
var circle;
document.getElementById("end-game").style.display = "none";

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
  circle.onclick = function() {
    score++;
    document.getElementById("score").innerHTML = score;
    gameArea.removeChild(circle);
    spawnCircle();
  };
  gameArea.appendChild(circle);
}


// Functions for drop down
let subMenu = document.getElementById("subMenu");

function toggleMenu(){
    subMenu.classList.toggle("open-menu");
}

//Functions for color change
function changeStyle(className, property, value) {
  var cssRules;
  for (var i = 0; i < document.styleSheets.length; i++) {
      cssRules = document.styleSheets[i].cssRules;
      for (var j = 0; j < cssRules.length; j++) {
          if (cssRules[j].selectorText === className) {
              cssRules[j].style.setProperty(property, value);
              alert("Color Changed Successfully");
              break;
          }
      }
  }
}