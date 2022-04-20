import React, { useState } from "react";

const Input = (props) =>{
  return (
    <input
      placeholder={props.placeholder}
      type="text"
      onChange={props.onChange}
    />
  );
}

const Button = (props) => {
  const { onClick, text } = props;
  return <button onClick={onClick}>{text}</button>;
};

function App() {
  const [zipcode, setZipcode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [unit, setUnit] = useState("F");

  const handleZip = (e) => {
    setZipcode(e.target.value);
  };

  const handleCountry = (e) => {
    setCountryCode(e.target.value);
  };

  const handleSubmit = () => {
    unit === "F" ? setUnit("C") : setUnit("F");

    if (zipcode === "" || countryCode === "") {
      alert("Please enter a location");
      return null;
    }

    getWeather();
  };

  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},${countryCode}&appid=1eba33578583cc2cb757872032783084`
    )
      .then((response) => response.json())
      .then((json) => {
        const { lat, lon, name } = json;
        postLocation(json.name);
        return { lat, lon, name };
      })
      .then((coordinates) => {
        const system = unit === 'F' ? 'imperial' : 'metric';

        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly&appid=1eba33578583cc2cb757872032783084&units=${system}`
        )
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            postForecast(json, unit);
            post3DayForecast(json, unit);
          });
      });
  };

const postLocation = (city) => {
  const location = document.querySelector(".location");
  location.innerHTML = `Thanks for checking in from ${city}!`;
};

const postForecast = (json, system) => {
  const weatherBox = document.querySelector(".weather-box");
  weatherBox.innerHTML = `<h3>Your forecast for today</h3>`;

  const { current, daily, alerts } = json;
  const temps = [
    current.temp,
    daily[0].temp.max,
    daily[0].temp.min,
    daily[0].feels_like.day,
  ];

  let currentDate = document.createElement("p");
  let city = document.createElement("p");
  let temp = document.createElement("P");
  let currentConditions = document.createElement("p");
  let tempHi = document.createElement("p");
  let tempLo = document.createElement("p");
  let feelsLike = document.createElement("p");
  let humidity = document.createElement("p");
  let windSpeed = document.createElement("p");

  let weatherAlerts = document.createElement("div");
  weatherAlerts.classList.add("weather-alerts");

  currentDate.innerHTML = `Your weather report was generated on ${new Date()}`;
  temp.innerHTML = `Current temperature: <span>${Math.round(
    temps[0]
  )} &#176${system}</span>`;
  currentConditions.innerHTML = `Currently the forecast is: <span>${current.weather[0].main}, with ${current.weather[0].description}</span>`;
  tempHi.innerHTML = `The high today is <span>${Math.round(
    temps[1]
  )} &#176${system}</span>`;
  tempLo.innerHTML = `The low today is <span>${Math.round(
    temps[2]
  )} &#176${system}</span>`;
  feelsLike.innerHTML = `During the day, it will feel around <span>${Math.round(
    temps[3]
  )} &#176${system}</span>`;
  humidity.innerHTML = `The humidity today is <span>${current.humidity}%</span>`;
  windSpeed.innerHTML = `The wind speed today is <span>${current.wind_speed} mph</span>`;

  if (!alerts) {
    weatherAlerts.innerHTML =
      "<h2>No Weather Alerts Today! Have a good day!</h2>";
  } else {
    let senderName = document.createElement("h4");
    let event = document.createElement("h4");
    let description = document.createElement("p");

    senderName.innerHTML = alerts.sender_name;
    event.innerHTML = alerts.event;
    description.innerHTML = alerts.description;

    weatherAlerts.append(senderName, event, description);
  }

  weatherBox.append(
    currentDate,
    city,
    temp,
    tempHi,
    tempLo,
    feelsLike,
    currentConditions,
    humidity,
    windSpeed,
    weatherAlerts
  );
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
        <Input placeholder={'Enter Zipcode'} onChange={handleZip}/>
        <Input placeholder={'Enter ISO Country Code'} onChange={handleCountry}/>
        <a
          target="_blank"
          rel="noreferrer"
          alt="ISO lookup"
          href="https://www.iso.org/obp/ui/#search"
        >
          ISO format
        </a>
        <Button text={"Get weather in °" + unit} onClick={handleSubmit}/>
      </div>
      <h3 className="location"></h3>

      <div className="forecast">
          <div className="weather-box">
          </div>
          <div className="future-forecast">
          </div>
      </div>
    </div>
  );
}

export default App;
