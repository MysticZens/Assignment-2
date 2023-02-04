var score = 0;
var time = 20;
var intervalId;
var circle;
var objectArray = Array();
document.getElementById("end-game").style.display = "none";
document.getElementById("submission-menu").style.display = "none";

function startGame() {
  document.getElementById("start-button").style.display = "none";
  document.getElementById("end-game").style.display = "none";
  score = 0;
  time = 1;
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
  var CircleRule = stylesheet.cssRules[0];

  CircleRule.style.backgroundColor = value;
  alert("Color Changed Successfully")
}

$(document).ready(function () {
  const APIKEY = "63de211e3bc6b255ed0c463c";
  getContacts();
  $("#submit-score").on("click", function(e) {
      e.preventDefault();
      let userName = $("#name").val();
      let userScore = score;
      let userDate = Date();

      let jsondata = {
      "name": userName,
      "score": userScore,
      "date": userDate
      };

      if (userName == "" || userName == null)
      {
        alert("You must input a name!");
      }

      else if (userName.length > 8)
      {
        alert("Your name must be at most 8 characters or less.");
      }

      else {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://minigamefps-5ce1.restdb.io/rest/basicaiming",
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
            $("#submit-score").prop("disabled", false);
            getContacts();
        });
      }
  });

  function getContacts(limit = 10, all = true) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://minigamefps-5ce1.restdb.io/rest/basicaiming?q={}&sort=score&dir=-1",
        "method": "GET",
        "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
        },
    }

    $.ajax(settings).done(function (response) {
        //console.log(response);
        let content = "";
        for (var i = 0; i < response.length && i < limit; i++)
        {
          content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
          <td>${response[i].score}</td>
          <td>${moment(response[i].date).format('Do MMMM YYYY, h:mm:ss a')}</td></tr>`
        }

        $("#user-list tbody").html(content);
    });
  }

});
