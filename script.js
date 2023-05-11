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

    if (data.current) {
        console.log("test");
    }
    console.log(data);
    console.log(data.error);
    console.log(data.current.temp_f);
    console.log(data.location.name);
}