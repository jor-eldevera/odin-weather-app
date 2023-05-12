const searchBtn = document.getElementById("searchBtn");
const searchBar = document.querySelector("input");
searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (scaleSwitch.checked) {
        getWeather(searchBar.value)
        .then((response) => { processJSON(response, "F") });
    } else {
        getWeather(searchBar.value)
        .then((response) => { processJSON(response, "C") });
    }
    weatherOnPage = true;
});

const scaleSwitch = document.getElementById("switch");
let weatherOnPage = false;
scaleSwitch.addEventListener("change", function (e) {
    if (weatherOnPage) { // only switch scales if there is info on the page
        if (scaleSwitch.checked) {
            getWeather(searchBar.value)
                .then((response) => { processJSON(response, "F") });
            
        } else {
            getWeather(searchBar.value)
                .then((response) => { processJSON(response, "C") });
        }
    }
});

async function getWeather(location) {
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=569bab717b714768a8f20938231105&q=${location}`, {mode: 'cors'});
    let weather = await response.json();
    
    return weather;
}

function processJSON(data, scale) {
    if (data.error) {
        console.error(data.error.message);
        if (data.error.code === 1006) {
            setError("No matching location found.");
        } else {
            setError("Error. Please try again.")
        }
    }
    
    if (data.current && data.location) {
        setWeatherCondition(data.current.condition.text, data.current.condition.icon);
        if (scale === "F") {
            setTemp(data.current.temp_f, data.current.feelslike_f, scale);
            setDetails(data.current.precip_in, data.current.humidity, data.current.wind_mph, scale);
        } else if (scale === "C") {
            setTemp(data.current.temp_c, data.current.feelslike_c, scale);
            setDetails(data.current.precip_mm, data.current.humidity, data.current.wind_kph, scale);
        } else {
            console.error("Error: processJSON requres F or C as a scale parameter. Scale recieved: " + scale);
        }
        setDateAndLocation(data.location.name, data.location.region, data.current.last_updated);
    }
    
    console.log(data);
}

const conditionText = document.getElementById("condition-text");
const conditionIcon = document.getElementById("condition-icon");
function setWeatherCondition(condition, imgURL) {
    conditionText.innerText = condition;
    conditionIcon.src = "https:" + imgURL;
}

const tempText = document.getElementById("temp");
const feelslikeText = document.getElementById("feelslike");
function setTemp(temp, feelslike, scale) {
    if (scale === "F") {
        tempText.innerText = temp + "°F";
        feelslikeText.innerText = "feels like " + feelslike + " °F";
    } else if (scale === "C") {
        tempText.innerText = temp + "°C";
        feelslikeText.innerText = "feels like " + feelslike + " °C";
    } else {
        console.error("Error: setTemp requires F or C as a scale parameter. Scale recieved: " + scale);
    }
}

const detailsText = document.getElementById("middle-right");
function setDetails(precipitation, humidity, windSpeed, scale) {
    if (scale === "F") {
        detailsText.innerText = "Precipitation (in): " + precipitation + "\n";
        detailsText.innerText += "Humidity: " + humidity + "%\n";
        detailsText.innerText += "Wind speed (mph): " + windSpeed;
    } else if (scale === "C") {
        detailsText.innerText = "Precipitation (mm): " + precipitation + "\n";
        detailsText.innerText += "Humidity: " + humidity + "%\n";
        detailsText.innerText += "Wind speed (kph): " + windSpeed;
    } else {
        console.error("Error: setDetails requires F or C as a scale parameter. Scale recieved: " + scale);
    }
}

const locationText = document.getElementById("bottom-left");
const dateText = document.getElementById("bottom-right");
function setDateAndLocation(name, region, last_updated) {
    locationText.innerText = name + ", " + region;
    dateText.innerText = last_updated;
}

function setError(error) {
    weatherOnPage = false;
    conditionText.innerText = error;
    conditionIcon.src = "";
    tempText.innerText = "";
    feelslikeText.innerText = "";
    detailsText.innerText = "";
    locationText.innerText = "";
    dateText.innerText = "";
}