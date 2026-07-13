import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Weather from './Components/Weather';
import './Components/Weather.css'; // Import for background styles

const API_KEY = "d9b79d81cf3b69d934b08a8ed97ba475";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        console.error("Geolocation error:", err);
        // Optional: Set default city or error
      }
    );
  }, []);

  const fetchJson = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || res.statusText || "Request failed");
    }
    return data;
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchJson(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchJson(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherClass = () => {
    if (!weatherData) return "default";
    const main = weatherData.weather?.[0]?.main;
    switch (main) {
      case "Clear": return "sunny";
      case "Clouds": return "cloudy";
      case "Rain":
      case "Thunderstorm": return "rainy";
      case "Snow": return "snowy";
      default: return "default";
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className={`weather-container ${getWeatherClass()}`}>
      <Navbar
        onSearch={fetchWeatherByCity}
        date={getCurrentDate()}
        location={weatherData ? `${weatherData.name}, ${weatherData.sys?.country}` : ''}
      />
      <Weather
        weatherData={weatherData}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;
