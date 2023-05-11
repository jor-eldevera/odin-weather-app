getWeather("Des Moines, washington");

async function getWeather(location) {
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=569bab717b714768a8f20938231105&q=${location}`, {mode: 'cors'})
    let weather = await response.json();

    console.log(weather);
    console.log(weather.current.temp_f);
    console.log(weather.location.name);
}