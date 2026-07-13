import React from "react";
import "./Weather.css";

import clearIcon from "../assets/Assets/clear.png";
import cloudsIcon from "../assets/Assets/cloud.png";
import rainIcon from "../assets/Assets/rain.png";
import windIcon from "../assets/Assets/wind.png";
import snowIcon from "../assets/Assets/snow.png";
import drizzleIcon from "../assets/Assets/drizzle.png";
import humidityIcon from "../assets/Assets/humidity.png";

export default function Weather({ weatherData, loading, error }) {
  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return clearIcon;
      case "Clouds":
        return cloudsIcon;
      case "Rain":
      case "Thunderstorm":
        return rainIcon;
      case "Snow":
        return snowIcon;
      case "Drizzle":
      case "Mist":
      case "Haze":
      case "Fog":
        return drizzleIcon;
      default:
        return cloudsIcon;
    }
  };

  const windKmH = (mps) => (mps ? (mps * 3.6).toFixed(1) : "--");

  return (
    <div className="weather-card">
      {loading && <div className="loading-spinner"></div>}
      {error && <p className="error-message">{error}</p>}

      {weatherData && !loading && !error && (
        <div className="weather-content">
          <div className="weather-main">
            <img
              src={getWeatherIcon(weatherData.weather?.[0]?.main)}
              alt="Weather Icon"
              className="weather-icon"
            />
            <div className="temp-container">
              <h1 className="temperature">
                {Math.round(weatherData.main.temp)}°
              </h1>
              <p className="description">
                {weatherData.weather?.[0]?.description}
              </p>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <img src={humidityIcon} alt="Humidity" />
              <div className="detail-text">
                <p className="value">{weatherData.main?.humidity}%</p>
                <p className="label">Humidity</p>
              </div>
            </div>
            <div className="detail-item">
              <img src={windIcon} alt="Wind" />
              <div className="detail-text">
                <p className="value">{windKmH(weatherData.wind?.speed)} km/h</p>
                <p className="label">Wind Speed</p>
              </div>
            </div>
            <div className="detail-item">
              <span className="material-icon">🌡️</span>
              <div className="detail-text">
                <p className="value">{Math.round(weatherData.main?.feels_like)}°</p>
                <p className="label">Feels Like</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!weatherData && !loading && !error && (
        <div className="welcome-message">
          <h2>Welcome to Atmosphere</h2>
          <p>Search for a city to get started.</p>
        </div>
      )}
    </div>
  );
}
