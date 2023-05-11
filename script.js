getWeather("Des Moines, washington")
    .then((response) => { processJSON(response) });

async function getWeather(location) {
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=569bab717b714768a8f20938231105&q=${location}`, {mode: 'cors'})
    let weather = await response.json();

    return weather;    
}

function processJSON(data) {
    console.log(data);
    console.log(data.current.temp_f);
    console.log(data.location.name);
}