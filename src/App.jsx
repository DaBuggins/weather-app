import { useEffect, useState } from "react";
import "./App.css";
import dayjs from "dayjs";
import { weatherCodes } from "./WeatherCodes";

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
        const url = `https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=temperature_2m,relative_humidity_2m,weather_code&current_weather=true&forecast_days=5&daily=temperature_2m_max,weather_code`;
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
        <h2>{dayjs(weatherData.daily.time[1]).format("dddd")}</h2>
        <p className="temperature">
          {weatherData.current_weather.temperature} °c
        </p>
        <p className="condition" style={{ fontWeight: "bold" }}>
          {
            weatherCodes[weatherData.current_weather.weathercode].day
              .description
          }
        </p>
        <img
          src={weatherCodes[weatherData.current_weather.weathercode].day.image}
          alt=""
        />
      </div>
      <div className="weather-details">
        <div>
          <p style={{ fontWeight: "bold" }}>Humidity</p>
          <p>{weatherData.hourly.relative_humidity_2m[0]}%</p>
        </div>
        <div>
          <p style={{ fontWeight: "bold" }}>Wind</p>
          <p>{weatherData.current_weather.windspeed} MPH</p>
        </div>
      </div>
      <div className="forecast">
        <h2 className="forecast-header">3-Day Forecast</h2>
        <div className="forecast-days">
          <div className="forecast-day">
            <p style={{ fontWeight: "bold" }}>
              {dayjs(weatherData.daily.time[1]).format("dddd")}
            </p>
            <img
              style={{ width: "50px", height: "50px" }}
              src={weatherCodes[weatherData.daily.weather_code[1]].day.image}
              alt=""
            />
            <p>{weatherData.daily.temperature_2m_max[1]}°c</p>
          </div>
          <div className="forecast-day">
            <p style={{ fontWeight: "bold" }}>
              {dayjs(weatherData.daily.time[2]).format("dddd")}
            </p>
            <img
              style={{ width: "50px", height: "50px" }}
              src={weatherCodes[weatherData.daily.weather_code[2]].day.image}
              alt=""
            />
            <p>{weatherData.daily.temperature_2m_max[2]}°c</p>
          </div>
          <div className="forecast-day">
            <p style={{ fontWeight: "bold" }}>
              {dayjs(weatherData.daily.time[3]).format("dddd")}
            </p>
            <img
              style={{ width: "50px", height: "50px" }}
              src={weatherCodes[weatherData.daily.weather_code[3]].day.image}
              alt=""
            />
            <p>{weatherData.daily.temperature_2m_max[3]}°c</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
