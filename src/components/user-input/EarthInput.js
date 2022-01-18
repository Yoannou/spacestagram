import React, { useState } from 'react'
import './EarthInput.css'

function EarthInput({onSubmit}) {

  const [yearValue, setYearValue] = useState("2015");
  const [monthValue, setMonthValue] = useState("1");

  function handleSliderChangeYear(e){
    setYearValue(e.target.value);
  }

  function handleSliderChangeMonth(e){
    setMonthValue(e.target.value);
  }

  function handleSliderSubmit(e){
    console.log("Changed: " + yearValue + "/" + monthValue);
    onSubmit(yearValue, monthValue);
  }

  return (
    <div className="earth-input-container">
    <form className="earth-input-form">
      <div className="year-select">
        <h3>Year:</h3>
        <div className="slider-wrapper">
          <input className="year-select-slider" type="range" id="yearVal" name="year" min="2015" max="2022" onChange={handleSliderChangeYear}></input>
          <div className="slider-value earth-slider-value">{yearValue}</div>
        </div>
      </div>
      <div className="month-select">
        <h3>Month:</h3>
        <div className="slider-wrapper">
          <input className="month-select-slider" type="range" id="monthVal" name="month" defaultValue="1" min="1" max="12" onChange={handleSliderChangeMonth}></input>
          <div className="slider-value earth-slider-value">{monthValue}</div>
        </div>
      </div>
      <input id="earth-submit" type="button" value="Search" onClick={handleSliderSubmit}></input>
    </form>
  </div>
  )
}

export default EarthInput
