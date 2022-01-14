import React, { useState, useEffect} from 'react'
import Title from './Title.js'
import PostsEarth from './posts/PostsEarth.js'
import './ViewEarth.css'
import earthBG from '../img/ss-earth-6.jpg'

function ViewEarth({offscreen, hidden}){
  return (
    <div className={"view view-earth offscreen-" + offscreen}>
      <div className="earth-bg">
        <div className="bg-filter"></div>
        <img className="earth-img" src={earthBG}></img>
      </div>
      <div className="container-outer-earth">
        <div className="container-inner-earth">
          <Title main="earth" sub="Gaze upon our beautiful blue planet from afar! These photos
          were taken by NASA's EPIC module."/>
          <PostsEarth hidden={hidden}/>
        </div>
      </div>
    </div>
  )
}

export default ViewEarth;
