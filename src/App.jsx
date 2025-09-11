import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");
  const [latitude, setLatitude] = useState(51.5085);
  const [longitude, setLongitude] = useState(-0.1257);

  // useEffect(() => {
  //   const fetchLocation = async (city) => {
  //     try {
  //       const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       setLatitude(data.results[0].latitude);
  //       setLongitude(data.results[0].longitude);
  //     } catch (error) {
  //       console.error("Error fetching location data:", error);
  //     }
  //   };
  //   fetchLocation();
  // }, [city]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code&current_weather=true`;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=temperature_2m,relative_humidity_2m,weather_code&current_weather=true`;
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }
  console.log(weatherData);
  return (
    <div className="wrapper">
      <div className="header">
        <h1 className="city">{city}</h1>
        <p className="temperature">
          {weatherData.current_weather.temperature} °c
        </p>
        <p className="condition">
          {weatherData.current_weather.weathercode} Cloudy
        </p>
      </div>
      <div className="weather-details">
        <div>
          <p>Humidity</p>
          <p>{weatherData.hourly.relative_humidity_2m[0]}%</p>
        </div>
        <div>
          <p>Wind</p>
          <p>{weatherData.current_weather.windspeed} MPH</p>
        </div>
      </div>
      <div className="forecast">
        <h2 className="forecast-header">5-Day Forecast</h2>
        <div className="forecast-days">
          <div className="forecast-day">
            <p>Monday</p>
            <p>Cloudy</p>
            <p>12°F</p>
          </div>
          <div className="forecast-day">
            <p>Tuesday</p>
            <p>Cloudy</p>
            <p>12°F</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
