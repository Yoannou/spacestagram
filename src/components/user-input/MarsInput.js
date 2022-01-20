import React, { useState } from 'react'
import './MarsInput.css'

function MarsInput({sol, onRoverChange, onSolChange}) {

  const [sliderValue, setSliderValue] = useState(sol);

  function handleRoverChange(e) {
    onRoverChange(e.target.name);
  }

  function handleSliderChange(e) {
    if (!isNaN(e.target.value)) {
      setSliderValue(e.target.value);
    }
  }

  function handleSliderSubmit(e) {
    e.preventDefault();
    onSolChange(sliderValue);
  }

  return (
    <div className="mars-input-container">
      <form className="mars-input-form">
        <div className="rover-select">
          <input type="button" className="btn rover-btn" name="spirit" value="Spirit" onClick={handleRoverChange}></input>
          <input type="button" className="btn rover-btn" name="opportunity" value="Opportunity" onClick={handleRoverChange}></input>
          <input type="button" className="btn rover-btn" name="curiosity" value="Curiosity" onClick={handleRoverChange}></input>
        </div>
        <div className="sol-select">
          <input className="sol-select-slider" type="range" id="sol-slider" name="sol" defaultValue="1" min="1" max="5111" onChange={handleSliderChange}></input>
          <div className="mars-slider-value">Sol: {sliderValue}</div>
        </div>
        <input id="mars-submit" className="btn" type="button" value="Select sol" onClick={handleSliderSubmit}></input>
      </form>
    </div>
  )
}

export default MarsInput
