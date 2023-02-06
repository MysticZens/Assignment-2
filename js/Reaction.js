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


$(document).ready(function () {
  const APIKEY = "63de50323bc6b255ed0c4656";
  getUsers();
  $("#submit-score").on("click", function(e) {
      e.preventDefault();
      let userName = $("#name").val();
      let userTime = totalTime;
      let userDate = Date();

      let jsondata = {
      "name": userName,
      "time": userTime,
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

      else {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://minigamefps-5ce1.restdb.io/rest/reactiontime",
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
            getUsers();
        });
      }
  });

  function getUsers(limit = 10, all = true) {
      let settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://minigamefps-5ce1.restdb.io/rest/reactiontime?q={}&sort=time&dir=1",
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
            <td>${response[i].time}ms</td>
            <td>${moment(response[i].date).format('Do MMMM YYYY, h:mm:ss a')}</td></tr>`
          }

          $("#user-list tbody").html(content);
      });
  }
})
