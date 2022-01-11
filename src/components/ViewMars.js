import React, { useState, useEffect} from 'react'
import Title from './Title.js'
import Posts from './posts/Posts.js'
import './ViewMars.css'
import marsBG from '../img/ss-mars-1.jpg'

function ViewMars({active}){
  return (
    <div className="view-mars inactive-mars">
      <div className="mars-bg">
        <div className="bg-filter"></div>
        <img className="mars-img" src={marsBG}></img>
      </div>
      <div className="container-mars">
        <Title main="Mars" sub="Explore the red planet through the eyes of one of 
        one of mankind's greatest technological achievements."/>
        <Posts />
      </div>
    </div>
  )
}

export default ViewMars;