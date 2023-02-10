const allStar = document.querySelectorAll('.rating .fa-star');
const ratingValue = document.querySelector('.rating input');
const APIKEY = "63e0ccba3bc6b255ed0c46f2";

// Gets all the star items
allStar.forEach((item, idx)=> {
	item.addEventListener('click', function () {
		let click = 0;
		ratingValue.value = idx + 1;

		allStar.forEach(i=> {
			// replaces all the solid stars with empty one when click
			i.classList.replace('fa-solid', 'fa-regular');
			i.classList.remove('active');
		});
		for(let i=0; i<allStar.length; i++) {
			if(i <= idx) {
				// Replaces all the empty stars with solid ones when clicked
				allStar[i].classList.replace('fa-regular', 'fa-solid');
				allStar[i].classList.add('active');
			} else {
				allStar[i].style.setProperty('--i', click);
				click++;
			}
		}
	});
});

document.getElementById("review-form").style.display = "none";
document.getElementById("score-load").style.display = "none";
document.getElementById("confirm").style.display = "none";

function ReviewDisplay(){
	// Display review form
    document.getElementById("review-form").style.display = "block";
}

function CancelSubmit() {
	// remove review form
    document.getElementById("review-form").style.display = "none";
}

// Drop down
let subMenu = document.getElementById("subMenu");

function toggleMenu(){
    subMenu.classList.toggle("open-menu");
}


$(document).ready(function () {
	const APIKEY = "63e0ccba3bc6b255ed0c46f2";
	getUsers();
	$("#submit-review").on("click", function(e) {
		e.preventDefault();
		let userName = $("#name").val();
		let userRank = $("#rank").val();
		let userMessage = $("#comment").val();
  
		if (userName == "")
		{
		alert("You must input a name!");
		}
  
		else if (userName.length > 14)
		{
		  alert("Your name must be at least 14 characters or more.");
		}
  
		else {
			document.getElementById("score-load").style.display = "block";      
			let jsondata = {
				"name": userName,
				"rank": userRank,
				"message": userMessage
			};

			let settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://minigamefps-5bb0.restdb.io/rest/review",
				"method": "POST",
				"headers": {
				"content-type": "application/json",
				"x-apikey": APIKEY,
				"cache-control": "no-cache"
				},
				"processData": false,
				"data": JSON.stringify(jsondata),
				"beforeSend": function() {
				$("submit-review").prop("disabled", true);
				}
			};
  
			$.ajax(settings).done(function (response) {
				$("#submit-review").prop("disabled", false);
				getUsers();
				document.getElementById("review-form").style.display = "none";
				document.getElementById("score-load").style.display = "none";
				document.getElementById("confirm").style.display = "block";
				setTimeout(function() {
				  document.getElementById("confirm").style.display = "none";
				  document.getElementById("start-button").style.display = "block";
				}, 2000);
			});
		}
	});
  
	function getUsers(all = true) {
		let settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://minigamefps-5bb0.restdb.io/rest/review?q={}&sort=rank&dir=-1",
			"method": "GET",
			"headers": {
			"content-type": "application/json",
			"x-apikey": APIKEY,
			"cache-control": "no-cache"
			},
		};
  
		$.ajax(settings).done(function (response) {
			let content = "";

			for (var i = 0; i < response.length; i++)
			{
				let stars = `<i class="fa-solid fa-star"></i>`;
				let repeat = response[i].rank;
				for (var index = 1; index < repeat; index++) {
					stars += `<i class="fa-solid fa-star"></i>`;
				}
				content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
				<td>` + stars + `</td>
				<td>${response[i].message}</td></tr>`;
			}
  
			$("#user-list tbody").html(content);
		});
	}
});

// Rating filter Function
function getUsersFilter(value) {
	let settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://minigamefps-5bb0.restdb.io/rest/review?q={}&sort=rank&dir=-1",
		"method": "GET",
		"headers": {
		"content-type": "application/json",
		"x-apikey": APIKEY,
		"cache-control": "no-cache"
		},
	};

	$.ajax(settings).done(function (response) {
		let content = "";
		// Make it so that they will only take the number of stars in "value"
		for (var i = 0; i < response.length; i++)
		{
			if (response[i].rank == value) {
				let stars = `<i class="fa-solid fa-star" style=":${i}"></i>`;
				let repeat = response[i].rank;
				for (var index = 1; index < repeat; index++) {
					stars += `<i class="fa-solid fa-star" style=":${index}"</i>`;
				}
				content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
				<td>` + stars + `</td>
				<td>${response[i].message}</td></tr>`;
			}
			else {
				continue;
			}
		}
		$("#user-list tbody").html(content);
		toggleMenu();
	});
}



// Another function to get back all
function getBackUsers(all = true) {
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://minigamefps-5bb0.restdb.io/rest/review?q={}&sort=rank&dir=-1",
		"method": "GET",
		"headers": {
		"content-type": "application/json",
		"x-apikey": APIKEY,
		"cache-control": "no-cache"
		},
	};

	$.ajax(settings).done(function (response) {
		var content = "";

		for (var i = 0; i < response.length; i++)
		{
			let stars = `<i class="fa-solid fa-star" style=":${i}"></i>`;
			let repeat = response[i].rank;
			for (var index = 1; index < repeat; index++) {
				stars += `<i class="fa-solid fa-star" style=":${index}"</i>`;
			}
			content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
			<td>` + stars + `</td>
			<td>${response[i].message}</td></tr>`;
		}

		$("#user-list tbody").html(content);
		toggleMenu();
	});
}
