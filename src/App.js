import React, { useState } from "react";
import CurrentForecast  from "./CurrentForecast";
import { Input, Button, Link } from "./Form";


function App() {
  const [zipcode, setZipcode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [unit, setUnit] = useState("F");
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});
  const [date, setDate] = useState("");

  if (weather.current) {
    let temps = [
      weather.current.temp,
      weather.daily[0].temp.max,
      weather.daily[0].temp.min,
      weather.daily[0].feels_like.day,
    ];
  }

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
            post3DayForecast(json, unit);
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
      <div className="forecast">
        {weather.current && <CurrentForecast weather={weather} date={date} unit={unit}/>}
        <div className="future-forecast"></div>
      </div>
    </div>
  );
}

export default App;
