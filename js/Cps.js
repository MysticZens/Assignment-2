const countdown = document.getElementById("countdown");
const gameArea = document.getElementById("game-area");
const startButton = document.getElementById("start-button");
const score = document.getElementById("score");

document.getElementById("end-game").style.display = "none";
document.getElementById("submission-menu").style.display = "none";

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
        countdown.innerHTML = `Time's up!`;
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

function DisplaySubmit(){
    document.getElementById("end-game").style.display = "none";
    document.getElementById("submission-menu").style.display = "block";
}
function CancelSubmit(){
    document.getElementById("end-game").style.display = "block";
    document.getElementById("submission-menu").style.display = "none";
}

$(document).ready(function () {
  const APIKEY = "63de50323bc6b255ed0c4656";
  let existingName = false;
  getContacts();
  $("#submit-score").on("click", function(e) {
      e.preventDefault();
      let userName = $("#name").val();
      let userScore = clicks;
      let userDate = Date();

      let jsondata = {
      "name": userName,
      "score": userScore,
      "date": userDate
      };

      if (userName == "")
      {
      alert("You must input a name!");
      }

      else if (userName.length > 8)
      {
        alert("Your name must be at least 8 characters or more.");
      }

      else if (existingName) {
        alert("Username has been taken. Please enter another username.");
      }

      else {
      let settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://minigamefps-5ce1.restdb.io/rest/clickspersecond",
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
          "url": "https://minigamefps-5ce1.restdb.io/rest/clickspersecond?q={}&sort=score&dir=-1",
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
            <td>${moment(response[i].date).format('Do MMMM YYYY, h:mm:ss a')}</td></tr>`
          }

          $("#user-list tbody").html(content);

          for (var i = 0; i < response.length; i++) {
            if (response[i].userName === $("#name").val()) {
              existingName = true;
              break;
            }
          }
      });
  }
})
