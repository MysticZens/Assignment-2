var score = 0;
var time = 20;
var intervalId;
var circle;
var audio = new Audio("sound/pop.mp4");

document.getElementById("end-game").style.display = "none";
document.getElementById("submission-menu").style.display = "none";
document.getElementById("score-load").style.display = "none";
document.getElementById("confirm").style.display = "none";

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
  circle.id = "target";
  circle.style.left = x + "%";
  circle.style.top = y + "%";
  circle.onclick = function() {
    score++;
    document.getElementById("score").innerHTML = score;
    gameArea.removeChild(circle);
    spawnCircle();
    audio.currentTime = 0;
    audio.volume = 0.1;
    audio.play();
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
    audio.currentTime = 0;
    audio.volume = 0.1;
    audio.play();
  };
  gameArea.appendChild(circle);
}

function displaySubmit(){
  document.getElementById("final-score-values").innerHTML = score;
  document.getElementById("end-game").style.display = "none";
  document.getElementById("submission-menu").style.display = "block";
}

function CancelSubmit(){
  document.getElementById("submission-menu").style.display = "none";
  document.getElementById("end-game").style.display = "block";
}

function playagain(){
  document.getElementById("end-game").style.display = "none";
  document.getElementById("start-button").style.display = "block";
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
  alert("Color Changed Successfully");
}

$(document).ready(function () {
  //Get the API key
  const APIKEY = "63e0ccba3bc6b255ed0c46f2";
  getUsers();
  //When person clicks submit button, api starts
  $("#submit-score").on("click", function(e) {
      e.preventDefault(); //Validation purposes
      let userName = $("#name").val();
      let userScore = score;
      let userDate = Date();

      let jsondata = {
      "name": userName,
      "score": userScore,
      "date": userDate
      };
      //check if userName is null or nothing
      if (userName == "" || userName == null)
      {
        alert("You must input a name!");
      }
      //check if userName is more than 14 characters
      else if (userName.length > 14)
      {
        alert("Your name must be at most 14 characters or less.");
      }

      //POST and display the new database inside the leaderboards
      else {
        document.getElementById("submission-menu").style.display = "none";
        document.getElementById("score-load").style.display = "block";
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://minigamefps-5bb0.restdb.io/rest/precisionaiming",
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
        };

        $.ajax(settings).done(function (response) {
            $("#submit-score").prop("disabled", false);
            getUsers();
            document.getElementById("score-load").style.display = "none";
            document.getElementById("confirm").style.display = "block";
            setTimeout(function() {
              document.getElementById("confirm").style.display = "none";
              document.getElementById("start-button").style.display = "block";
            }, 2000);
        });
      }
  });
  //Function to GET the database and print the leaderboards when website loads, limit only display 10 leaderboards
  function getUsers(limit = 10, all = true) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://minigamefps-5bb0.restdb.io/rest/precisionaiming?q={}&sort=score&dir=-1",
        "method": "GET",
        "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
        },
    };

    $.ajax(settings).done(function (response) {
        var content = "";
        for (var i = 0; i < response.length && i < limit; i++)
        {
          content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
          <td>${response[i].score}</td>
          <td>${moment(response[i].date).format('Do MMMM YYYY, h:mm:ss a')}</td></tr>`; 
        }

        $("#user-list tbody").html(content);
    });
  }

});
