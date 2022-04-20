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
  const [unit, setUnit] = useState("imperial");

  const handleZip = (e) => {
    setZipcode(e.target.value);
    console.log(zipcode);
  };

  const handleCountry = (e) => {
    setCountryCode(e.target.value);
    console.log(countryCode);
  };

  const handleUnit = () => {
    unit === "imperial" ? setUnit("metric") : setUnit("imperial");
    console.log(unit);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
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
        <Button text={"Get weather in " + unit} onClick={handleUnit}/>
      </div>
    </div>
  );
}

export default App;
