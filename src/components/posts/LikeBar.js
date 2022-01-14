import React from 'react'
import {HiStar, HiDownload, HiThumbUp} from 'react-icons/hi'
import './LikeBar.css'

function Likebar() {
  return (
    <div className="post-like-bar-container">
      <div className="post-like-bar">
        <HiThumbUp className="like-bar-icon like-icon"/>
        <HiStar className="like-bar-icon heart-icon"/>
        <HiDownload className="like-bar-icon download-icon"/>
      </div>
    </div>
  )
}

export default Likebar
