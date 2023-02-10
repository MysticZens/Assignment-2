const countdown = document.getElementById("countdown");
const gameArea = document.getElementById("game-area");
const startButton = document.getElementById("start-button");
const score = document.getElementById("score");

document.getElementById("end-game").style.display = "none";       // Display all of the unwanted things to none
document.getElementById("submission-menu").style.display = "none";
document.getElementById("score-load").style.display = "none";
document.getElementById("confirm").style.display = "none";

let clicks = 0;     // Set number of clicks to 0
let timeLeft = 10;  // Set time to 10
let intervalId;     // Set interval id
let gameStarted = false;  // Game started to make the function as false

gameArea.addEventListener("click", function() {
    if (!gameStarted || timeLeft === 0) return; // Ends the click function when gamestarted is false or time = 0 
    clicks++;
    score.innerHTML = `Score: ${clicks}`;	// Always updates the score in html
});

startButton.addEventListener("click", function() {
	startButton.style.display = "none";
	counter.innerHTML = "3";
	setTimeout(function() {		
		counter.innerHTML = "2";
	}, 1000);						
	setTimeout(function() {			// Set time out for 3 2 1 using set time out and the number
		counter.innerHTML = "1";
	}, 2000);
	setTimeout(function() {
		gameStarted = true;	// Set gamestart to true when the game stars
		counter.innerHTML = "GO!";
		countdown.innerHTML = `Time remaining: ${timeLeft}`;	// Display the time
		intervalId = setInterval(function() {
			timeLeft--;		// Minus the time by 1 for every interval 
			counter.innerHTML = "";
			countdown.innerHTML = `Time remaining: ${timeLeft}`;
			if (timeLeft === 0) {
			clearInterval(intervalId);	// Ends the game and display times up when the time is 0
			countdown.innerHTML = `Time's up!`;
			document.getElementById("final-score-value").innerHTML = clicks;	// Display the score
			document.getElementById("end-game").style.display = "block";		// Display end game
			document.getElementById("play-again-button").addEventListener("click", playAgain);
			}
		}, 1000);
	}, 3000);
});

function playAgain() {
	// Resetting of all variables when play again function is called
    document.getElementById("end-game").style.display = "none";
    clicks = 0;
    timeLeft = 10;
    gameStarted = false;
    score.innerHTML = "Score: 0";
    countdown.innerHTML = `Time remaining: ${timeLeft}`;
    startButton.style.display = "inline-block";
}

function DisplaySubmit(){
	// Just to display the submission menu
	document.getElementById("end-game").style.display = "none";
    document.getElementById("submission-menu").style.display = "block";
}
function CancelSubmit(){
	// Cancel the submit to show back the end game
    document.getElementById("end-game").style.display = "block";
    document.getElementById("submission-menu").style.display = "none";
}

// Ripple effect on click
const btn = document.getElementById("game-area");

btn.addEventListener("click", ev => {
  let ripple = document.createElement('div');
  ripple.classList = "ripple";			// Adding ripple class list
  ripple.style.left = ev.offsetX + 'px';	// Giving an offset for left and top to know where the ripple comes out
  ripple.style.top = ev.offsetY + 'px';
  btn.append(ripple); // Adding ripple to the game area as const at the top
  ripple.addEventListener('animationend', () => ripple.remove()); // Once animation end remove the ripple child
});


$(document).ready(function () {
  //Get the API key
  const APIKEY = "63e0ccba3bc6b255ed0c46f2";
  let existingName = false;
  getUsers();
  //When person clicks submit button, api starts
  $("#submit-score").on("click", function(e) {
      e.preventDefault(); //Validation purposes
      let userName = $("#name").val();
      let userScore = clicks;
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
        alert("Your name must be at least 14 characters or more.");
      }
      //POST and display the new database inside the leaderboards
      else {
        document.getElementById("submission-menu").style.display = "none";
        document.getElementById("score-load").style.display = "block";
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://minigamefps-5bb0.restdb.io/rest/clickspersecond",
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
            console.log(response);
            $("#submit-score").prop("disabled", false);
            getUsers();
            document.getElementById("score-load").style.display = "none";
            document.getElementById("confirm").style.display = "block";
            setTimeout(function() {
              document.getElementById("confirm").style.display = "none";
              document.getElementById("start-button").style.display = "block";
              score.innerHTML = "Score: 0";
              countdown.innerHTML = `Time remaining: ${timeLeft}`;
            }, 2000);
        });
      }
  });
  //Function to GET the database and print the leaderboards when website loads, limit only display 10 leaderboards
  function getUsers(limit = 10, all = true) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://minigamefps-5bb0.restdb.io/rest/clickspersecond?q={}&sort=score&dir=-1",
        "method": "GET",
        "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
        },
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
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
