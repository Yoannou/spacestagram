import React from 'react'
import Title from './Title.js'
import './Home.css'

function Home({offscreen, onButtonClick}) {

  function handleButtonClick(e) {
    onButtonClick(e.target.value);
  }

  return (
    <section id="home" className={"view view-home offscreen-"+offscreen}>
      <div className="home-title-container">
        <Title main="Spacetagram" sub="Creep your solar system."/>
      </div>
      <div className="navigation">
          <div className="to-planet to-earth">
            <button className="btn" value="earth" onClick={handleButtonClick}>View Earth</button>
          </div>
          <div className="to-planet to-mars">
            <button className="btn" value="mars" onClick={handleButtonClick}>View Mars</button>
          </div>
        </div>
    </section>
  )
}

export default Home