import React from 'react'
import Title from './Title.js'
import './Home.css'

function Home({offscreen}) {
  return (
    <div className={"home-view offscreen-"+offscreen}>
      <Title main="Spacetagram" sub="Explore space with us."/>
    </div>
  )
}

export default Home
