const allStar = document.querySelectorAll('.rating .fa-star')
const ratingValue = document.querySelector('.rating input')

allStar.forEach((item, idx)=> {
	item.addEventListener('click', function () {
		let click = 0
		ratingValue.value = idx + 1

		allStar.forEach(i=> {
			i.classList.replace('fa-solid', 'fa-regular')
			i.classList.remove('active')
		})
		for(let i=0; i<allStar.length; i++) {
			if(i <= idx) {
				allStar[i].classList.replace('fa-regular', 'fa-solid')
				allStar[i].classList.add('active')
			} else {
				allStar[i].style.setProperty('--i', click)
				click++
			}
		}
	})
})

document.getElementById("review-form").style.display = "none";

function ReviewDisplay(){
    document.getElementById("review-form").style.display = "block";
}

function CancelSubmit() {
    document.getElementById("review-form").style.display = "none";
}

$(document).ready(function () {
	const APIKEY = "63de50323bc6b255ed0c4656";
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
  
		else if (userName.length > 8)
		{
		  alert("Your name must be at least 8 characters or more.");
		}
  
		else {      
			let jsondata = {
				"name": userName,
				"rank": userRank,
				"message": userMessage
			};

			let settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://minigamefps-5ce1.restdb.io/rest/review",
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
			}
  
			$.ajax(settings).done(function (response) {
				console.log(response);
				$("#submit-review").prop("disabled", false);
				getUsers();
			});
		}
	});
  
	function getUsers(limit = 10, all = true) {
		let settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://minigamefps-5ce1.restdb.io/rest/review",
			"method": "GET",
			"headers": {
			"content-type": "application/json",
			"x-apikey": APIKEY,
			"cache-control": "no-cache"
			},
		}
  
		$.ajax(settings).done(function (response) {
			let content = "";
			for (var i = 0; i < response.length && i < limit; i++)
			{
			  content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
			  <td>${response[i].rank}</td>
			  <td>${response[i].message}</td></tr>`
			}
  
			$("#user-list tbody").html(content);
		});
	}
  })
  