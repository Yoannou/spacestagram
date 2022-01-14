import React from 'react'
import Title from './Title.js'
import './Home.css'

function Home({offscreen}) {
  return (
    <div id="home" className={"view view-home offscreen-"+offscreen}>
      <div className="home-container">
        <Title main="Spacetagram" sub="Explore space with us."/>
      </div>
    </div>
  )
}

export default Home
