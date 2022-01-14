import React, { useState, useEffect} from 'react'
import Title from './Title.js'
import PostsMars from './posts/PostsMars.js'
import './ViewMars.css'
import marsBG from '../img/ss-mars-1.jpg'

function ViewMars({offscreen, hidden}){
  return (
    <div className={"view view-mars offscreen-"+offscreen}>
      <div className="mars-bg">
        <div className="bg-filter"></div>
        <img className="mars-img" src={marsBG}></img>
      </div>
      <div className="container-outer-mars">
        <div className="container-inner-mars">
          <Title main="Mars" sub="Explore the red planet through the eyes of one of
         one of mankind's greatest technological achievements."/>
          <PostsMars hidden={hidden}/>
        </div>
      </div>
    </div>
  )
}

export default ViewMars;
