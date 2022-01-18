import React, { useState } from 'react'
import { HiStar, HiDownload } from 'react-icons/hi'
import './LikeBar.css'

function Likebar({image, id}) {

  const [liked, setLiked] = useState(false);
  
  function toggleLiked() {
    setLiked(!liked);
  }

  return (
    <div className="post-like-bar-container">
      <div className="post-like-bar">
        <div className="post-like-bar-left" onClick={toggleLiked}>
          <HiStar className={"like-bar-icon star-icon " + (liked && "active")} />
        </div>
        <div className="post-like-bar-right">
          <a href={image} download={"nasa-image-" + id} target="blank" className="like-bar-icon download-icon">
            <HiDownload />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Likebar
