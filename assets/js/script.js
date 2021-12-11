function init() {
    const inputEl = document.getElementById("city-input");
    const searchEl = document.getElementById("search-btn");
    const clearEl = document.getElementById("clear-history");
    const nameEl = document.getElementById("city-name");
    const currentPicEl = document.getElementById("current-pic");
    const currentTempEl = document.getElementById("temp");
    const currentHumidityEl = document.getElementById("humidity");4
    const currentWindEl = document.getElementById("wind-speed");
    const currentUVEl = document.getElementById("uv-index");
    const historyEl = document.getElementById("history");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);


const APIKey = "96c66bd19cbc57cd7d76c0b994ba1fee";

//whatever city is typed by the user, this function should read it once a button is clicked

function gatherWeather(cityName) {

    
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    axios.get(queryURL)
    .then(function(response){
        console.log(response);

        const currentDate = new Date(response.data.dt*1000);
        console.log(currentDate);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        nameEl.innerHTML = response.data.name + " (" + month +"/" + day + "/" + year + ")";
        let weatherImg = response.data.weather[0].icon;
        currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherImg + "@2x.png");
        currentPicEl.setAttribute("alt", response.data.weather[0].description);
        currentTempEl.innerHTML = "Temperature: " + degree(response.data.main.temp) + " &#176F"; // &#176F converts degree units
        currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
        currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

     

        let cityID = response.data.id;
        let forecastQuery = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
        axios.get(forecastQuery)
        .then(function(response){

            console.log(response);
            const forecastEls = document.querySelectorAll(".forecast");
            for (i=0; i < forecastEls.length; i++){
                forecastEls[i].innerHTML = "";
                const forecastIndex = i * 8 + 4;
                const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                const forecastDay = forecastDate.getDate();
                const forecastMonth = forecastDate.getMonth() + 1;
                const forecastYear = forecastDate.getFullYear();
                const forecastDateEl = document.createElement("p");
                forecastDateEl.setAttribute("class", "mt-3 mb-o forecast-date");
                forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                forecastEls[i].append(forecastDateEl);
                const forecastWeatherEl = document.createElement("img");
                forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon +"@2x.png");
                forecastDateEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                forecastEls[i].append(forecastWeatherEl);
                const forecastTempEl = document.createElement("p");
                forecastEls.innerHTML = "Temp: " + degree(response.data.list[forecastIndex].main.temp) + "&#176F";
                forecastEls[i].append(forecastTempEl);
                const forecastHumidityEl = document.createElement("p");
                forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                forecastEls[i].append(forecastHumidityEl);
        
            }
        })
     });

}

searchEl.addEventListener("click", function(){
    const searchExpression = inputEl.value;
    gatherWeather(searchExpression);
    searchHistory.push(searchExpression);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
})

clearEl.addEventListener("click", function(){
    searchHistory = [];
    renderSearchHistory();
})

function degree(K){
    return Math.floor((K - 273.15) * 1.8 + 32);
}

function renderSearchHistory(){
    historyEl.innerHTML = "";
    for (let i=0; i < searchHistory.length; i++){
        const historyItem = document.createElement("input");

        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "form-control d-block bg white");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function() {
            gatherWeather(historyItem.value);

        })

        historyEl.append(historyItem);
    }
}

    renderSearchHistory();
    if (searchHistory.length > 0) {
        gatherWeather(searchHistory[searchHistory.length - 1]);
    }



}
init();