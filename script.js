const searchBtn = document.getElementById("searchBtn");
const searchBar = document.querySelector("input");
searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    getWeather(searchBar.value)
        .then((response) => { processJSON(response) });
})

async function getWeather(location) {
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=569bab717b714768a8f20938231105&q=${location}`, {mode: 'cors'});
    let weather = await response.json();
    
    return weather;
}

function processJSON(data) {
    if (data.error) {
        console.error(data.error.message);
        if (data.error.code === 1006) {
            // display error text on the page here
            // No matching location found.
        } else {
            // Error
        }
    }
    
    if (data.current && data.location) {
        setWeatherCondition(data.current.condition.text, data.current.condition.icon);
        setTemp(data.current.temp_f, data.current.feelslike_f);
    }
    
    console.log(data);
    console.log(data.error);
    console.log(data.current.temp_f);
    console.log(data.location.name);
}

const conditionText = document.getElementById("condition-text");
const conditionIcon = document.getElementById("condition-icon");
function setWeatherCondition(condition, imgURL) {
    conditionText.innerText = condition;
    conditionIcon.src = "https:" + imgURL;
}

const tempText = document.getElementById("temp");
const feelslikeText = document.getElementById("feelslike");
function setTemp(temp, feelslike) {
    tempText.innerText = temp + "°F";
    feelslikeText.innerText = "feels like " + feelslike + " °F";
}