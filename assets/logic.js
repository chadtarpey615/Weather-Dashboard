const apiKey = "2f680f0cc7fc4c9096f0c3c8c7e8a2e4";
var cities = [];
const date = moment().format("MMM Do YY");
let long;
let lat;

$(".hide").hide()



searchCity("nashville");

function cityInfo() {
  let city = $("#city-input").val()
  searchCity(city);
}





function repeatCity(e) {
  e.preventDefault();
  //$("#new").text("");
  let repeat =  this.innerHTML
  searchCity(repeat);
  console.log(repeat);
 
}

    




function searchCity(city) {
  //city = $("#city-input").val();
  
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=2f680f0cc7fc4c9096f0c3c8c7e8a2e4";
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=2f680f0cc7fc4c9096f0c3c8c7e8a2e4";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //console.log(response);

    var cityName = $("<h1>").text(response.name + " (" + date + " )");
    var cityTemp = $("<h4>").text("Temperature: " + response.main.temp + " F");
    var windSpeed = $("<h4>").text(
      "Wind Speed: " + response.wind.speed + " MPH"
    );
    var iconPic = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
    );
    $(".jumbotron").empty();
    $(".jumbotron").append(cityName, cityTemp, windSpeed, iconPic);
    lat = response.coord.lat
    long = response.coord.lon 
    //console.log(response.coord.lon);


    var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude={part}&units=imperial&appid=2f680f0cc7fc4c9096f0c3c8c7e8a2e4"

  $.ajax({
    url: uvURL,
    method: "GET"
  }).then(function(response){
    //console.log(response);
    var uvRays = $("<h4>").text("UV Index:")
    var uvIndex = $("<h4>").text(response.current.uvi);

    var index = uvIndex.text();

    if (index <= 3) {
      uvIndex.addClass("green")

    } else if(index >= 3 && index <= 8) {
      uvIndex.addClass("yellow")

    }else {
      uvIndex.addClass("red");
    }

    $(".jumbotron").append(uvRays, uvIndex);

  })
  });


  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (response) {
    //console.log(response);
    var k = 1;

    for (i = 0; i <= 40; i += 8) {
      $(".hide").show()

      $("#card-" + k).empty()


      //console.log(response.list[i].dt_txt);
      $("#card-" + k).append($("<h4>").text(city.toUpperCase()));

      $("#card-" + k).append($("<p>").text(response.list[i].dt_txt));

      $("#card-" + k).append(
        $("<img>").attr(
          "src",
          "http://openweathermap.org/img/w/" +
          response.list[i].weather[0].icon +
          ".png"
        )
      );

      $("#card-" + k).append(
        $("<p>").text("Today's High " + response.list[i].main.temp)
      );
      $("#card-" + k).append(
        $("<p>").text("Humidity " + response.list[i].main.humidity + "%")
      );

      k += 1;
    }
  });
}
function saveCity(event) {
  event.preventDefault();

  var newCity = $("#city-input").attr("id");

  var listCity = $("#city-input").val();

  cities.push(listCity);
  localStorage.setItem("cities", JSON.stringify(cities));
}



function showCitys() {
  $("#city-input").each(function () {
    var key = $("#city-input").val();
    var newInput = $('<button class="list-group-item" id="button">');
    //newInput.addClass("well")
    newInput.text($(this).val().toUpperCase());
    $("#new-input").append(newInput);

  });

}

function history(storage) {
  if (storage.length === null){
    return
  }
for (i = 0; i < storage.length; i++) {
  cities.push(storage[i])
}
showCitys();
}

//history(localStorage.getItem("cities")) ;

// pull items out of local storage


// function getItems() {

// }







$("#add-city").on("click", cityInfo);
$("#add-city").on("click", showCitys);
$("#add-city").on("click", saveCity);
$(document).on("click", "#button", repeatCity);