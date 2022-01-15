import React, { useState } from 'react'
import './MarsInput.css'

function MarsInput({sol, onRoverChange, onSolChange}) {

  // Define max sols for all 3 rovers here
  const MAXSOLS = {
    curiosity: 3356,
    opportunity: 5111,
    spirit: 2208
  };

  let op = "opportunity";

  console.log(MAXSOLS.opportunity);

  const [sliderValue, setSliderValue] = useState(sol);
  const handleSliderChange = (event) => {
    if (!isNaN(event.target.value)) {
      setSliderValue(event.target.value);
      console.log(sliderValue);
    }
  }
  const handleSliderSubmit = (e) => {
    e.preventDefault();
    console.log("Generating images from sol: " + sliderValue);
  }



  return (
    <div className="mars-input-container">
      <form className="mars-input-form">
        <div className="rover-select">

        </div>
        <div className="sol-select">
          <input className="sol-select-slider" type="range" id="vol" name="vol" min="1" max={MAXSOLS.curiosity} onChange={handleSliderChange}></input>
          <div className="slider-value">Sol: {sliderValue}</div>
        </div>
        <input type="button" value="Select" onClick={handleSliderSubmit}></input>
      </form>
    </div>
  )
}

export default MarsInput