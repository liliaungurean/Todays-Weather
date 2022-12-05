$(document).ready(function(){
    
    
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
    

    getWeather("");
    });  