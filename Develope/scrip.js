$(document).ready(function(){
var apiKey = "5ddd8035290f23820fc56c033adccb7c";        
    
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
    

    getWeather("Minneapolis");
    });  