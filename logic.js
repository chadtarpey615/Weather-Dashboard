const apiKey = "2f680f0cc7fc4c9096f0c3c8c7e8a2e4"
var cities = [""];
function searchCity () {
    var city = $(this).attr("data-name");
    //var city = $("#city").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=2f680f0cc7fc4c9096f0c3c8c7e8a2e4";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);


        //let newSearch = $("<div>");

    })
}





$("#add-city").on("click", function(event) {
    event.preventDefault();
})

$(document).on("click",  searchCity);