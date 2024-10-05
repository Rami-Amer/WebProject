// Gets the main container element where the weather details will be shown
const weatherContainer = document.getElementById('weather-container');

// List to show data for 5+ locations.
const locations = [
    {name: 'Tokyo, Japan', latitude: 35.6895, longitude: 139.6917},
    {name: 'New York, USA', latitude: 40.7128, longitude: -74.0060},
    {name: 'London, UK', latitude: 51.5074, longitude: -0.1278},
    {name: 'Sydney, Australia', latitude: -33.8688, longitude: 151.2093},
    {name: 'Cairo, Egypt', latitude: 30.0444, longitude: 31.2357},
    {name: 'Paris, France', latitude: 48.8566, longitude: 2.3522}
];

//This function to Get and show weather for all locations list.
function getWeather() {
    // Iterate over each location in the list.
    locations.forEach(location => {
        // Define the url to fetch the weather information
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;

        // Send a GET request by using the fetch function.
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // Get the current weather information from the API.
                const weatherData = data.current_weather;
                // Determine if it's day or not
                const isDay = (weatherData.is_day) ? 'Day' : 'Night';

                // Create a new div to display the weather information
                const weatherItem = document.createElement('div');
                // Add the class to the div.
                weatherItem.classList.add('weather-box');

                // Creat the innerHTML of the new div to display the weather information
                weatherItem.innerHTML = `
                    <h3>${location.name}</h3>
                    <p>Temperature: ${weatherData.temperature}°C</p>
                    <p>Wind Speed: ${weatherData.windspeed} km/h</p>
                    <p>Wind Direction: ${weatherData.winddirection}°</p>
                    <p>Time: ${weatherData.time}</p>
                    <p>Day/Night: ${isDay}</p>
                    <p>Weather Code: ${weatherData.weathercode}</p>
                `;

                // Append the new div to our main weather container
                weatherContainer.appendChild(weatherItem)
            })
            // Handle any errors occur during fetching the weather data.
            .catch(err => console.log('Error the fetching weather data: ', err));
    })

}

// fetch the weather page data
getWeather();

// This function to update the weather data every 5 minutes (300,000 ms).
setInterval(getWeather, 300000);