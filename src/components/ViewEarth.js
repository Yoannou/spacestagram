import React, { useState, useEffect} from 'react'
import Title from './Title.js'
import PostsEarth from './posts/PostsEarth.js'
import './ViewEarth.css'

function ViewEarth({active}){

  let xIndex;

  if (active) {
    
  }

  return (
    <div className="view-earth">
      <div className="container-earth">
        <Title main="earth" sub="Gaze upon our beautiful blue planet from afar! These photos
        were taken by NASA's EPIC module."/>
        <PostsEarth />
      </div>
    </div>
  )
}

export default ViewEarth;