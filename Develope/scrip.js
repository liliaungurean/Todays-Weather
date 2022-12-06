$(document).ready(function(){
    
    var searchedCitiesArray = [];

    $("#searchBtn").on("click", getSearchInput);
    $(document).on("click", ".selected", storedCities);
    
    searchHistory();
    
    function storedCities() {
        var city = $(this)[0].innerHTML;
        getWeather(city);
        }
    
    function getSearchInput(event) {

        event.preventDefault();
        $("#previousSearches").empty();

        var city = $(".form-control").val(); 
        searchedCitiesArray.push(city);
        localStorage.setItem("cities", JSON.stringify(searchedCitiesArray));
        var searchHistoryList = $("<div>").text(city).addClass("selected");
        $("#searchHistory").append(searchHistoryList);
        $("#searchInput").val("");
        getWeather(city);
    }
    
    //Create function to display cities search History stored in localStorage
    function searchHistory() {

        searchedCitiesArray = JSON.parse(localStorage.getItem("cities"));

        if (searchedCitiesArray == null) {
        searchedCitiesArray = [];
         }
        for (var i = 0; i < searchedCitiesArray.length; i++) {
            var displaySearchedCities = searchedCitiesArray[i];
            var searchHistoryList = $("<div>").text(displaySearchedCities).addClass("selected"); 
            $("#searchHistory").append(searchHistoryList);
        }
    }

    //weather API call
    var apiKey = "5ddd8035290f23820fc56c033adccb7c";    
    function getWeather (city) {

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
    
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "jsonp",
            success: function(response){
                console.log(queryURL);
                console.log(response);
    
                    function date_format(dt_string){
                        var date = new Date(dt_string.dt*1000);
                        return date.toDateString();
                    }
    
                    function temp_trans(input){
                        var temp =  "Temp: " + ((input.main.temp- 273.15) * 1.80 + 32).toFixed(2) + " F ";
                        return temp;
                    }
            
               $("#previousSearches").empty();
    
                var holder= response.list[0];
                
                
    //current weather
                            $(".currentCity").html("<h3>" + response.city.name + " " + date_format(holder) + "</h3>").append(
                                $('<img src=" '+ "http://openweathermap.org/img/wn/"+response.list[0].weather[0].icon+"@2x.png" +' "/>')); 
                            $(".humidity").text("Humidity: " + holder.main.humidity + " %");
                            $(".windSpeed").text("Wind Speed: " + holder.wind.speed + " mph");
                            $(".temperature").text(temp_trans(holder));
                        
                        for(i=1; i<=5; i++){
                        holder= response.list[(i*8)-1];
                      
                        $("#"+ i + "dayForecast").text(date_format(holder));
                        $("#"+ i + "dayIcon").empty().append($('<img src=" '+ "http://openweathermap.org/img/wn/"+holder.weather[0].icon+".png" +' "/>'));
                        $("#"+ i + "dayHumidity").text("Humidity: " + holder.main.humidity + " %");
                        $("#"+ i + "dayTemperature").text(temp_trans(holder));
    
                        }
                  }
            });           
    } 
    getWeather("Minneapolis"); 
});  