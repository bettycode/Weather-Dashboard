$(document).ready(function () {
  //variables
  var cityLi = $("#city-li");
  var list = [];

  var hour = moment().hours();

// this gets the weather and the uv 
  function getWeatherOne() {

    var apiKey = "a6eb63a8f46454e34332e9c93150ac61";
    var input = $("#input").val();
    $("#input").val("");
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      input +
      "&appid=" +
      apiKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      $("#city-view").empty();
      
      console.log(response);

      console.log(queryURL);
      console.log(response.weather[0].icon);

      var pinput = $("<p>")
        .addClass("ppp")
        .text(input + " " + "(" + moment().format("L") + ")");
      $("#city-view").append(pinput);

      var image = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
      $("#city-view").append(image);

      var temp = parseInt((response.main.temp * 9) / 5 - 459);

      temp = Math.floor(temp);

      var tOne = $("<p>").text("Temprature: " + temp + " °F");
      $("#city-view").append(tOne);

      var humid = response.main.humidity;

      var tTwo = $("<p>").text("Hunidity: " + humid + " %");
      $("#city-view").append(tTwo);

      var windS = response.wind.speed;

      var tThree = $("<p>").text("Wind Speed: " + windS);
      $("#city-view").append(tThree);

      var lon = response.coord.lon;
      var lat = response.coord.lat;
      console.log(lat);
      console.log(lon);
            
      //uv Index
      var uvURL =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey;

      $.ajax({
        url: uvURL,
        method: "GET",
      }).then(function (uvResponse) {
        console.log(uvResponse[0].value);
        console.log(uvURL);
        var tfour = $("<span>").text(uvResponse[0].value);
        console.log(tfour.text(uvResponse[0].value));
       // tfour.attr("class", "red orange yellow green");
        
        var tfive = $("<p>").text("UV Index : ");
        tfive.append(tfour);
        $("#city-view").append(tfive);
        
        if (uvResponse[0].value > 0 && uvResponse[0].value <= 2) {
          tfour.attr("class", "green");
        } else if (uvResponse[0].value > 2 && uvResponse[0].value <= 5) {
          tfour.attr("class", "yellow");
        } else if (uvResponse[0].value > 5 && uvResponse[0].value <= 7) {
          tfour.attr("class", "orange");
        } else if (uvResponse[0].value > 7 && uvResponse[0].value <= 10) {
          tfour.attr("class", "red");
        }
      });
    });

    //five day forecast
    var weatherURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      input +
      "&appid=" +
      apiKey;

    $.ajax({
      url: weatherURL,
      method: "GET",
    }).then(function (weatherResponse) {
      $("#day-five").empty();
      $("#5title").empty();

      console.log(weatherResponse);

      console.log(queryURL);
      var day5 = $("<h4>").text("5-Day Forecast:");
      $("#5title").append(day5);


      for (var i = 0; i < weatherResponse.list.length; i += 8) {
        var cardDiv = $("<div class=' card-deck'>");
        $("#day-five").append(cardDiv);
        var fiveDayDiv = $("<div class=' card-body five'>");

      
        var day = weatherResponse.list[i].dt_txt.split("-")[2].split(" ")[0];
        var month = weatherResponse.list[i].dt_txt.split("-")[1];
        var year = weatherResponse.list[i].dt_txt.split("-")[0];

        var fOne = $("<h5 class='card-title'>").text(
          month + "/" + day + "/" + year
        );

        var image = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/w/" +
            weatherResponse.list[i].weather[0].icon +
            ".png"
        );

        var temp = weatherResponse.list[i].main.temp;
        var fTwo = $("<p class='card-text'>").text("Temp: " + temp);

        var hum = weatherResponse.list[i].main.humidity;
        var fThree = $("<p class='card-text'>").text("Humidity " + hum);

        fiveDayDiv.append(fOne);
        fiveDayDiv.append(image);
        fiveDayDiv.append(fTwo);
        fiveDayDiv.append(fThree);
        cardDiv.append(fiveDayDiv);
      }
    });
  }

  //clear button
  var clear = $("#clear");
//event listener for clear button
  clear.on("click", function () {
    window.location.reload(true);
    window.localStorage.clear();
    cityLi.empty();
  });

  //event listener for search button
  $("#button").on("click", function (e) {
    e.preventDefault();
   // e.stopPropagation();
    
    var input = $("#input").val();

    //storing the input/cities
    if (localStorage.getItem("city") !== null) {
      list = JSON.parse(localStorage.getItem("city"));
    }
    list.push(input);
    localStorage.setItem("city", JSON.stringify(list));

    renderCity();
    getWeatherOne();
     //renderCity()
  });
// get the stored inputs/cities and also creat li 
  function renderCity() {
    $("#city-li").empty();
    if (localStorage.getItem("city") !== null) {
      list = JSON.parse(localStorage.getItem("city"));
    }

    for (var i = 0; i < list.length; i++) {
      var one = list[i];
    
      var li = $("<li>").text(one);
      li.addClass("container");
      li.attr("data-one", one);
      li.attr("id", "oneli");
      $("#city-li").prepend(li);
    }

    getWeatherOne();
  }
  renderCity();




});
