var apiKey = `338e085a01d0ad5362997718b2dae8bf`
const searchBtn = document.querySelector("#search")
const cityInput = document.querySelector("#cityInput")
searchBtn.addEventListener("click", function(){
    var city = cityInput.value
    console.log(city)
    currentWeather(city)
});
function currentWeather(city){
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    fetch(currentWeatherUrl)
    .then(function(response){
        console.log(response)
        return response.json()
    }).then(function(results){
        console.log(results)
        document.querySelector("#cityName").textContent = results.name
        document.querySelector("#Temp").textContent = "Temperature:"+results.main.temp
        document.querySelector("#date").textContent = new Date(results.dt*1000).toLocaleDateString() 
        document.querySelector("#humidity").textContent = "Humidity" + results.main.humidity
        document.querySelector("#windSpeed").textContent = "Wind Speed:"+results.wind.speed
        // document.querySelector("#UV").textContent = results.
        document.querySelector("#icon").setAttribute("src", ` http://openweathermap.org/img/wn/${results.weather[0].icon}.png`)
        fiveDayForecast(results.coord.lat,results.coord.lon)
    })
}
function fiveDayForecast(lat, lon) {
    
    var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=imperial`
    fetch (forecastUrl)
    .then(function(response){
        console.log(response)
        return response.json()
    }).then(function(results){
        console.log (results)
    })
}