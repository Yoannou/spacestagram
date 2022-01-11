import React, { useState, useEffect} from 'react'
import Title from './Title.js'
import PostsEarth from './posts/PostsEarth.js'
import './ViewEarth.css'
import earthBG from '../img/ss-earth-6.jpg'

function ViewEarth({active}){
  return (
    <div className="view-earth inactive-earth">
      <div className="earth-bg">
        <div className="bg-filter"></div>
        <img className="earth-img" src={earthBG}></img>
      </div>
      <div className="container-earth">
        <Title main="earth" sub="Gaze upon our beautiful blue planet from afar! These photos
        were taken by NASA's EPIC module."/>
        <PostsEarth />
      </div>
    </div>
  )
}

export default ViewEarth;