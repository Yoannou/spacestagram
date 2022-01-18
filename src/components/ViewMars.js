import React, { useState, useEffect} from 'react'
import {AiFillCaretLeft} from 'react-icons/ai'
import Title from './Title.js'
import PostsMars from './posts/PostsMars.js'
import './ViewMars.css'
import marsBG from '../img/ss-mars-1-min.jpg'

function ViewMars({offscreen, hidden, onButtonClick}){

  function handleButtonClick(e) {
    console.log(e.target.value);
    onButtonClick(e.target.value);
  }

  return (
    <section className={"view view-mars offscreen-"+offscreen}>
      <div className="to-home-from-mars">
        <button value="home" onClick={handleButtonClick}><AiFillCaretLeft/></button>
      </div>
      <div className="mars-bg">
        <div className="bg-filter"></div>
        <img className="mars-img" src={marsBG}></img>
      </div>
      <div className="container-outer-mars">
        <div className="container-inner-mars">
          <Title main="Mars" sub="Explore the red planet through the eyes of one of
         one of mankind's greatest technological achievements: NASA's Martian rovers.
         Select a rover and a sol (Martian day) from which to pull images."/>
          <PostsMars hidden={hidden}/>
        </div>
      </div>
    </section>
  )
}

export default ViewMars;