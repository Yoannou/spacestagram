import React from 'react'
import Title from './Title.js'
import './Home.css'

function Home({offscreen, onButtonClick}) {

  function handleButtonClick(e) {
    console.log(e.target.value);
    onButtonClick(e.target.value);
  }

  return (
    <div id="home" className={"view view-home offscreen-"+offscreen}>
      <div className="home-title-container">
        <Title main="Spacetagram" sub="Explore space with us."/>
      </div>
      <div className="navigation">
          <div className="to-planet to-earth">
            <button value="earth" onClick={handleButtonClick}>View Earth</button>
            <p>Earth is a beautiful place.</p>
          </div>
          <div className="to-planet to-mars">
            <button value="mars" onClick={handleButtonClick}>View Mars</button>
            <p>Mars is really cool.</p>
          </div>
        </div>
        <div className="toggle-music">
            <p>Music: off</p>
        </div>
    </div>
  )
}

export default Home
