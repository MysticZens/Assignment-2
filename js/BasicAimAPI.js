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
        let userDate = date;
        
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
            <td>${response[i].currentDate}</td>`
            }

            $("#user-list tbody").html(content);
        });
    }
})