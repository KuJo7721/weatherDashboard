var apiKey = `338e085a01d0ad5362997718b2dae8bf`
const searchBtn = document.querySelector("#search")
const cityInput = document.querySelector("#cityInput")
const forecast = document.querySelector("#forecast")

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
searchBtn.addEventListener("click", function(){
    var city = cityInput.value
    console.log(city)
    currentWeather(city)
    if (searchHistory.indexOf(city) === -1){
        searchHistory.push(city)
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    addSearchButton(city)
    }
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
    
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=imperial`
    fetch (forecastUrl)
    .then(function(response){
        console.log(response)
        return response.json()
    }).then(function(results){
        console.log (results)
        var days = results.list.filter(day=>day.dt_txt.includes('09:00:00'))
        console.log (days)
        forecast.innerHTML = ""
        let cards = ``
        for (let i = 0; i < days.length; i++) {
        const card = `
        <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${new Date(days[i].dt*1000).toLocaleDateString()}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${days[i].main.temp}</h6>
    <p class="card-text">Humidity${days[i].main.humidity}.</p>
  </div>
</div>`
cards += card
        }
        forecast.innerHTML = cards 
    })
}
function addSearchButton(city){
    let btn = `<button type="button" class="list-group-item list-group-item-action" onclick = "currentWeather('${city}')">${city}</button>`
    document.querySelector(".list-group").innerHTML += btn
}
for (let i = 0; i < searchHistory.length; i++) {
    addSearchButton(searchHistory[i])
    
}