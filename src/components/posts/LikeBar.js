import React, { useState } from 'react'
import {HiStar, HiDownload, HiThumbUp} from 'react-icons/hi'
import './LikeBar.css'

function Likebar({image, id}) {

  const [liked, setLiked] = useState(false);
  
  function toggleLiked() {
    setLiked(!liked);
  }

  return (
    <div className="post-like-bar-container">
      <div className="post-like-bar">
        <HiStar className={"like-bar-icon star-icon " + (liked && "active")} onClick={toggleLiked}/>
        <a href={image} download={"nasa-image-" + id} target="blank" className="like-bar-icon download-icon">
          <HiDownload />
        </a>
      </div>
    </div>
  )
}

export default Likebar
