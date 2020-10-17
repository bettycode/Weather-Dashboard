//render city lists
var inputEl = $("#input");
var cityLi = $("#city-li");
var list =[]

var hour = moment().hours();

/*function today() {
    $("#city-view").text(moment().format("L"));
}
console.log(moment().format("LLLL"));

today();*/


function getWeatherOne(){  
    var apiKey = "a6eb63a8f46454e34332e9c93150ac61";
    var input = $("#input").val();
    $("#input").val("");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ input +"&appid=" +apiKey;
                    
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response){
        $("#city-view").empty();
       // $("#city-view").text(JSON.stringify(response));
        console.log(response);
        
        console.log(queryURL)
        console.log(response.weather[0].icon)
       
       var p =  $("<p>").addClass("pp").text( input + moment().format("L"));
       $("#city-view").append(p);

        var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        $("#city-view").append(image);

        var temp = (response.main.temp- 273.15) * 1.80 + 32;
        
        temp = Math.floor(temp);

        var tOne = $("<p>").text("Temprature: " + temp);
        $("#city-view").append(tOne);


        var humid = response.main.humidity;

        var tTwo = $("<p>").text("Hunidity: " + humid);
        $("#city-view").append(tTwo);

        var windS = response.wind.speed;

        var tThree = $("<p>").text("Wind Speed: " + windS);
        $("#city-view").append(tThree);


    
      /*  var lon = response.coord.lon;
        var lat = response.coord.lat;
     

        var uvURL ="https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        
        $.ajax({
            url: uvURL,
            method: "GET"
    
        }).then(function(uvResponse){
            console.log(uvResponse);
            console.log(uvResponse.uvURL);
            var uv =uvResponse.object[0].val();
            var tfour = $("<p>").text("UV Index" + uv);
            $("#city-view").append(tfour);
           
        });*/

        
     });
      

    
        var weatherURL ="https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=" +  apiKey;
                         
        $.ajax({
            url: weatherURL,
            method: "GET"
    
        }).then(function(weatherResponse){
            $("#day-five").empty();
           
    
            console.log(weatherResponse);
            
            console.log(queryURL);
    

            for (var i = 0; i< weatherResponse.list.length; i+=8 ){

                var cardDiv = $("<div class=' card-deck'>");
                $("#day-five").append(cardDiv)
            var fiveDayDiv = $("<div class=' card-body five'>");
            
           
            //var date = weatherResponse.list[i].dt_txt;
            var day = weatherResponse.list[i].dt_txt.split("-")[2].split(" ")[0];
            var month = weatherResponse.list[i].dt_txt.split("-")[1];
            var year = weatherResponse.list[i].dt_txt.split("-")[0];


            var fOne = $("<h5 class='card-title'>").text(month + "/" + day + "/" + year);

            var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" +weatherResponse.list[i].weather[0].icon + ".png");
            fiveDayDiv.append(image);
    


            var temp = weatherResponse.list[i].main.temp;
            var fTwo = $("<p class='card-text'>").text("Temp: " + temp);


            var hum = weatherResponse.list[i].main.humidity;
            var fThree = $("<p class='card-text'>").text("Humidity " + hum);

                
                

            fiveDayDiv.append(fOne);
            
            fiveDayDiv.append(fTwo);
            fiveDayDiv.append(fThree);
            cardDiv.append(fiveDayDiv);


            }

        })

    

};





   
$("#button").on("click",function(e){
    e.preventDefault();
    var inputEl = $("#input").val();
    //$("#input").val("");
    var li = $("<li>").text(inputEl);
    $("#city-li").prepend(li);
  


    var input = $("#input").val();
       
        var list =[];
        if (localStorage.getItem("city") !== null) {
            list = JSON.parse(localStorage.getItem("city"));
        }
        list.push(input);       
        localStorage.setItem("city",JSON.stringify(list));


        getWeatherOne();
      
        
});
function renderCity(){
    // var input = $(".inputOne").val().trim();
    var list = [];
    if (localStorage.getItem("city") !== null) {
        list = JSON.parse(localStorage.getItem("city"));
    }
   
}    
    renderCity();