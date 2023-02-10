let gameArea = document.getElementById("gameArea");
let startBtn = document.getElementById("startBtn");
let result = document.getElementById("result");
const time = document.getElementById("time");
const message = document.getElementById("message");

document.getElementById("result").style.display = "none"; // Displaying all unwanted things as none
document.getElementById("end-game").style.display = "none";
document.getElementById("submission-menu").style.display = "none";
document.getElementById("score-load").style.display = "none";
document.getElementById("confirm").style.display = "none";

let startTime; // Set start time for the time before the game area turns green adn clicked
let intervalId; // Same concept as the previous interval ids
let clickCount = 0; // Set click Count to 0 and total time to 0 and game started to false
let totalTime = 0;
let gameStarted = false;

gameArea.addEventListener("click", function () {
  if (gameStarted && gameArea.style.backgroundColor === "red") {
    document.getElementById("result").style.display = "none";
    message.innerHTML = "You clicked too early!"; // If game started and the game area is red
    message.classList.remove("hidden"); // Error message will pop up and will display start button
    clearTimeout(intervalId);
    gameStarted = false; // Reset all values
    clickCount = 0;
    totalTime = 0;
    startBtn.style.display = "inline";
  } else if (gameArea.style.backgroundColor === "green") {
    let endTime = new Date().getTime(); // end time is the time when clicked
    clickCount++; // Click is added when the area turns green and clicked
    totalTime += endTime - startTime; // Total time is end time minus start time
    time.innerHTML = (totalTime / clickCount).toFixed(2);
    averageTime = (totalTime / clickCount).toFixed(2); // Js calculate average reaction time and store for API
    gameArea.style.backgroundColor = "red"; // Changes back the background to red
    clearTimeout(intervalId);
    message.classList.add("hidden");
    if (clickCount < 5) {
      // Sets time out for when there is still more clicks
      intervalId = setTimeout(startGame, Math.random() * 5000 + 1000);
    } else {
      // Games end and the end game and results is not show
      gameStarted = false;
      document.getElementById("end-game").style.display = "block";
      document.getElementById("result").style.display = "none";
      document.getElementById("final-score-value").innerHTML = time.innerHTML;
    }
  }
});

function start() {
  // Removes unwanted stuff and resets every value used
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

function reshow() {
  // Just reshow the start button when play again is clicked
  document.getElementById("end-game").style.display = "none";
  document.getElementById("startBtn").style.display = "block";
}

function startGame() {
  // New start time
  startTime = new Date().getTime();
  gameArea.style.backgroundColor = "green";
}

function displaySubmit() {
  // Displaying the submission menu and remove everything else
  document.getElementById("final-score-values").innerHTML = time.innerHTML;
  document.getElementById("end-game").style.display = "none";
  document.getElementById("submission-menu").style.display = "block";
}

function cancelSubmit() {
  // remove the submission menu and show the end game
  document.getElementById("end-game").style.display = "block";
  document.getElementById("submission-menu").style.display = "none";
}
startBtn.style.display = "inline";
gameArea.style.backgroundColor = "red";

$(document).ready(function () {
  //Get the API key
  const APIKEY = "63e0ccba3bc6b255ed0c46f2";
  getUsers();
  
  //When person clicks submit button, api starts
  $("#submit-score").on("click", function (e) {
    e.preventDefault(); //Validation purposes
    let userName = $("#name").val();
    let userTime = averageTime;
    let userDate = Date();

    let jsondata = {
      "name": userName,
      "time": userTime,
      "date": userDate,
    };
    //check if userName is null or nothing
    if (userName == "" || userName == null) {
      alert("You must input a name!");
    }
    //check if userName is more than 14 characters
    else if (userName.length > 14) {
      alert("Your name must be at least 14 characters or more.");
    }
    //POST and display the new database inside the leaderboards
    else {
      document.getElementById("submission-menu").style.display = "none";
      document.getElementById("score-load").style.display = "block";
      var settings = {
        async: true,
        crossDomain: true,
        url: "https://minigamefps-5bb0.restdb.io/rest/reactiontime",
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache",
        },
        processData: false,
        data: JSON.stringify(jsondata),
        beforeSend: function () {
          $("submit-score").prop("disabled", true);
        },
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
        $("#submit-score").prop("disabled", false);
        getUsers();
        document.getElementById("score-load").style.display = "none";
        document.getElementById("confirm").style.display = "block";
        setTimeout(function () {
          document.getElementById("confirm").style.display = "none";
          document.getElementById("startBtn").style.display = "block";
        }, 2000);
      });
    }
  });
  //Function to GET the database and print the leaderboards when website loads, limit only display 10 leaderboards
  function getUsers(limit = 10, all = true) {
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://minigamefps-5bb0.restdb.io/rest/reactiontime?q={}&sort=time&dir=1",
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      var content = "";
      for (var i = 0; i < response.length && i < limit; i++) {
        content = `${content}<tr id='${response[i]._id}'><td>${
          response[i].name}</td>
            <td>${response[i].time}ms</td>
            <td>${moment(response[i].date).format(
              "Do MMMM YYYY, h:mm:ss a"
            )}</td></tr>`;
      }

      $("#user-list tbody").html(content);
    });
  }
});
