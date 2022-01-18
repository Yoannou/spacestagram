import React from 'react'
import {AiFillCaretRight} from 'react-icons/ai'
import Title from './Title.js'
import PostsEarth from './posts/PostsEarth.js'
import './ViewEarth.css'
import earthBG from '../img/ss-earth-6-min.jpg'

function ViewEarth({offscreen, hidden, onButtonClick}){

  function handleButtonClick(e) {
    onButtonClick(e.target.value);
  }

  return (
    <section className={"view view-earth offscreen-" + offscreen}>
      <div className="to-home-from-earth">
        <button value="home" onClick={handleButtonClick}><AiFillCaretRight/></button>
      </div>
      <div className="earth-bg">
        <div className="bg-filter"></div>
        <img className="earth-img" alt="The Earth in the background" src={earthBG}></img>
      </div>
      <div className="container-outer-earth">
        <div className="container-inner-earth">
          <Title main="earth" sub="Gaze upon our beautiful blue planet from afar! These photos
          were taken by the EPIC camera module of NASA's Deep Space Climate Observatory. Search by year and month
          using the sliders, or load more to get results from the next calendar day."/>
          <PostsEarth hidden={hidden} />
        </div>
      </div>
    </section>
  )
}

export default ViewEarth;
