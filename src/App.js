import React, { useState } from "react";
import { Input, Button, Link } from "./Form";

function App() {
  const [zipcode, setZipcode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [unit, setUnit] = useState("F");
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});
  const [date, setDate] = useState("");

  if (weather.current) { let temps = [
    weather.current.temp,
    weather.daily[0].temp.max,
    weather.daily[0].temp.min,
    weather.daily[0].feels_like.day,
  ]; }

  const handleZip = (e) => {
    setZipcode(e.target.value);
  };

  const handleCountry = (e) => {
    setCountryCode(e.target.value);
  };

  const handleSubmit = () => {
    let d = new Date();
    setDate(d.toString());

    unit === "F" ? setUnit("C") : setUnit("F");

    if (zipcode === "" || countryCode === "") {
      alert("Please enter a location");
      return null;
    }

    getWeather();
  };

  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},${countryCode}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        const { lat, lon, name } = json;
        setLocation({ lat, lon, name });
        return { lat, lon, name };
      })
      .then((coordinates) => {
        const system = unit === "F" ? "imperial" : "metric";
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly&appid=${process.env.REACT_APP_API_KEY}&units=${system}`
        )
          .then((response) => response.json())
          .then((json) => {
            const { current, daily, alerts } = json;
            setWeather({ current, daily, alerts });
            // post3DayForecast(json, unit);
          });
      });
  };

  const post3DayForecast = (json, unit) => {
    const futureForecast = document.querySelector(".future-forecast");
    futureForecast.innerHTML = `<h3>Your three day forecast</h3>`;

    for (let i = 1; i < 4; i++) {
      let daily = json.daily[i];
      let hiLo = document.createElement("p");
      let condition = document.createElement("p");
      let img = document.createElement("img");

      hiLo.innerHTML = `<span>${Math.round(
        daily.temp.max
      )} &#176${unit} / ${Math.round(daily.temp.min)} &#176${unit}</span>`;
      condition.innerHTML = `The forecast calls for ${daily.weather[0].description}`;
      img.src = `https://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`;
      futureForecast.append(img, hiLo, condition);
    }

    futureForecast.style.border = "2px solid black";
  };

  return (
    <div className="App">
      <h1>How's the Weather</h1>
      <div className="user-input">
        <Input placeholder={"Enter Zipcode"} onChange={handleZip} />
        <Input
          placeholder={"Enter ISO Country Code"}
          onChange={handleCountry}
        />
        <Link />
        <Button text={"Get weather in °" + unit} onClick={handleSubmit} />
      </div>
      {location.name && (
        <h3 className="location">
          Thanks for checking in from {location.name}!
        </h3>
      )}
      {weather.current && (
        <div className="forecast">
          <div className="weather-box">
          <p>Your weather report was generated on {date}</p>
            <p>
              Current temperature:{" "}
              <span>
                {Math.round(weather.current.temp)} °{unit}
              </span>
            </p>
            <p>
              Currently the forecast is:{" "}
              <span>
                {weather.current.weather[0].main}, with{" "}
                {weather.current.weather[0].description}
              </span>
            </p>
            <p>
              The high today is{" "}
              <span>
                {Math.round(weather.daily[0].temp.max)} °{unit}
              </span>
            </p>
            <p>
              The low today is{" "}
              <span>
                {Math.round(weather.daily[0].temp.min)} °{unit}
              </span>
            </p>
            <p>
              During the day, it will feel around{" "}
              <span>
                {Math.round(weather.daily[0].feels_like.day)} °{unit}
              </span>
            </p>
            <p>
              The humidity today is <span>{weather.current.humidity}%</span>
            </p>
            <p>
              The wind speed today is{" "}
              <span>{weather.current.wind_speed} mph</span>
            </p>
            <div className="weather-alerts">
              {!weather.alerts ? (
                <h2>No alerts today! Have a great day!</h2>
              ) : (
                <div>
                  <p>{weather.alerts.sender_name}</p>
                  <p>{weather.alerts.event}</p>
                  <p>{weather.alerts.description}</p>
                </div>
              )}
            </div>
          </div>
          <div className="future-forecast">

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
