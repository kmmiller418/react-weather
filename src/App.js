import React, { useState } from "react";

function App() {
  const [zipcode, setZipcode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [unit, setUnit] = useState('imperial');

  const handleZip = (e) => {
    setZipcode(e.target.value);
    console.log(zipcode);
  } 
  
  const handleCountry = (e) => {
    setCountryCode(e.target.value);
    console.log(countryCode);
  }

  const handleUnit = () => {
    unit === 'imperial' ? setUnit('metric') : setUnit('imperial');
    console.log(unit);
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <h1>How's the Weather</h1>
      <div className="user-input">
        <input
          placeholder="enter zipcode"
          id="zipcode"
          name="zipcode"
          type="text"
          onChange={handleZip}
        />
        <input
          placeholder="enter country code"
          id="countryCode"
          name="countryCode"
          type="text"
          onChange={handleCountry}
        />
        <a
          target="_blank"
          rel="noreferrer"
          alt="ISO lookup"
          href="https://www.iso.org/obp/ui/#search"
        >
          ISO format
        </a>
        <button value={unit} onClick={handleUnit}>
          Get weather in {unit}
        </button>
      </div>
    </div>
  );
}

export default App;
