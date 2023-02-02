var score = 0;
var time = 20;
var intervalId;
var circle;
document.getElementById("end-game").style.display = "none";
document.getElementById("submission-menu").style.display = "none";

function startGame() {
  document.getElementById("start-button").style.display = "none";
  document.getElementById("end-game").style.display = "none";
  score = 0;
  time = 5;
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
  circle.id = "target";
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

function displaySubmit(){
  document.getElementById("final-score-values").innerHTML = score;
  document.getElementById("end-game").style.display = "none";
  document.getElementById("submission-menu").style.display = "block";
}

function spawnCircle() {
  var gameArea = document.getElementById("game-area");
  var x = Math.random() * 80;
  var y = Math.random() * 80;
  circle = document.createElement("div");
  circle.classList.add("circle");
  circle.classList.add("animate1");
  circle.id = "target";
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

function displaySubmit(){
  document.getElementById("final-score-values").innerHTML = score;
  document.getElementById("end-game").style.display = "none";
  document.getElementById("submission-menu").style.display = "block";
}

function cancelsubmit(){
  document.getElementById("submission-menu").style.display = "none";
  document.getElementById("end-game").style.display = "block";
}
// Functions for drop down
let subMenu = document.getElementById("subMenu");

function toggleMenu(){
    subMenu.classList.toggle("open-menu");
}

//Functions for color change
function changeStyle(value){
  var stylesheet = document.styleSheets[1];
  var outerCircleRule = stylesheet.cssRules[0];
  var innerCircleRule = stylesheet.cssRules[2];

  outerCircleRule.style.backgroundColor = value;
  innerCircleRule.style.backgroundColor = value;
  alert("Color Changed Successfully")
}

$(document).ready(function () {
  const APIKEY = "63db111c3bc6b255ed0c4562";
  const date = new Date();
  let day = date.getDate();
  let monthName = date.toLocaleString("default", {month: "long"});
  let year = date.getFullYear();

  let currentDate = `${day} ${monthName} ${year}`
  getContacts();
  $("#submit-score").on("click", function(e) {
      e.preventDefault();
      let userName = $("#name").val();
      let userScore = score;
      let userDate = currentDate;
      
      let jsondata = {
      "name": userName,
      "score": userScore,
      "date": userDate
      };

      if (userName == "")
      {
      alert("You must input a name!");
      }

      else {
      let settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://minigamefps-2325.restdb.io/rest/basicaiming",
          "method": "POST",
          "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
          },
          "processData": false,
          "data": JSON.stringify(jsondata),
          "beforeSend": function() {
          $("submit-score").prop("disabled", true);
          }
      }

      $.ajax(settings).done(function (response) {
          console.log(response);
          $("#submit-score").prop("disabled", false);
          getContacts();
      });
      }
  });

  function getContacts(limit = 10, all = true) {
      let settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://minigamefps-2325.restdb.io/rest/basicaiming",
          "method": "GET",
          "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
          },
      }

      $.ajax(settings).done(function (response) {
          console.log(response);

          let content = "";

          for (var i = 0; i < response.length && i < limit; i++)
          {
          content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
          <td>${response[i].score}</td>
          <td>${response[i].date}</td>`
          }

          $("#user-list tbody").html(content);
      });
  }
})