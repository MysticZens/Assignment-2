var score = 0;  // Set Score to 0
var time = 20;  // Set Time to 20 seconds
var intervalId; // Setting IntervalID for moving down the number going down
var circle;
document.getElementById("end-game").style.display = "none";         // Just hiding the non required stuff for now
document.getElementById("submission-menu").style.display = "none";
document.getElementById("score-load").style.display = "none";
document.getElementById("confirm").style.display = "none";

function startGame() {
	document.getElementById("start-button").style.display = "none";   // Remove start button When game starts
	document.getElementById("end-game").style.display = "none";       // Remove end game
	score = 0;    // Set score and time to 0 and 20
	time = 20;
	document.getElementById("score").innerHTML = score;		// Give the id score in html the score
	document.getElementById("time").innerHTML = time;		// Give id time in html the time
	intervalId = setInterval(countdown, 1000);		// Set the interval to go down by 1000 which is 1 seconds
	document.body.style.cursor = "crosshair";		// Change the cursor to a crosshair
	spawnCircle();		// Calling the function SpawnCircle to spawn the circle in the game area
}

function endGame() {
	clearInterval(intervalId);	// Clear the interval
	document.getElementById("final-score-value").innerHTML = score;	// Display the final score
	document.getElementById("end-game").style.display = "block";	// Display the end game
	let circle = document.querySelector(".circle");					// Getting the circle element
	let gameArea = document.querySelector("#game-area");			// Getting the game area element
	document.body.style.cursor = "auto";	// Changing back the cursor to normal
	gameArea.removeChild(circle);	// Remove the circle from the game area
}

function countdown() {
	time--;		// Make time go down by 1 every second
	document.getElementById("time").innerHTML = time;
	if (time === 0) {
		endGame();	// When time is 0, the game ends
	}
}

function spawnCircle() {
	var gameArea = document.getElementById("game-area");
	var x = Math.random() * 80;	// Get a random x & y coordinate inside the game area
	var y = Math.random() * 80;
	circle = document.createElement("div");	// Creating the div element for circle and add a class to it
	circle.classList.add("circle");
	circle.classList.add("animate1");
	circle.id = "target";		// Add a id target to the circle
	circle.style.left = x + "%";	// Adding % to the random value to top and left
	circle.style.top = y + "%";
	circle.onclick = function() {
		score++; // Adding a score by 1 if a circle is clicked
		document.getElementById("score").innerHTML = score;	// Changing the score to the updated one
		gameArea.removeChild(circle);	// Removes the circle and adds a new one in the gamearea
		spawnCircle();
	};
	gameArea.appendChild(circle);
}

function displaySubmit(){
	// just display the submission menu by displayin the score in the submission menu
	document.getElementById("final-score-values").innerHTML = score;
	document.getElementById("end-game").style.display = "none";
	document.getElementById("submission-menu").style.display = "block";
}

function cancelsubmit(){
	// Remove the submission menu and display back the end game
	document.getElementById("submission-menu").style.display = "none";
	document.getElementById("end-game").style.display = "block";
}

function playagain(){
	// Display again the  start button to play again
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
  var outerCircleRule = stylesheet.cssRules[0];
  var innerCircleRule = stylesheet.cssRules[2];
  // Call out the Css style and change the colors of the outer and inner circle to the color

  outerCircleRule.style.backgroundColor = value;
  innerCircleRule.style.backgroundColor = value;
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
        let jsondata = {
          "name": userName,
          "score": userScore,
          "date": userDate
        };

        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://minigamefps-5bb0.restdb.io/rest/basicaiming",
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
  function getUsers(all = true) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://minigamefps-5bb0.restdb.io/rest/basicaiming?q={}&sort=score&dir=-1",
        "method": "GET",
        "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
        },
    }; 

    $.ajax(settings).done(function (response) {
      $("#submit-score").prop("disabled", false);
      const limit = 10;
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


