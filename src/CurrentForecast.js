const CurrentForecast = ({weather, date, unit}) => {
  return (
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
        The wind speed today is <span>{weather.current.wind_speed} mph</span>
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
  );
};

export default CurrentForecast;