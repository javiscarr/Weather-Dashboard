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

    
    let queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
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
        currentTempEl.innerHTML = "Temperature: " + degree(response.data.list[forecastIndex].main.temp) + " &#176F"; // &#176F converts degree units
        currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
        currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

        let lat = response.data.coord.lat;
        let lon = response.data.coord.long;
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon" + lon + "&appid=" + APIKey + "&cnt="
     })

}