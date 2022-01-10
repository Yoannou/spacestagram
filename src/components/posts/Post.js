import React from 'react'
import Image from './Image.js'
import LikeBar from './LikeBar.js'
import Text from './text/Text.js'
import './Post.css'

function Post({planet, image, heading, date, description}) {
  return (
    <div className="post-wrapper">
      <div className="post">
        <Image image={image}/>
        <LikeBar />
        <Text heading={heading} date={date} description={description}/>
      </div>
    </div>
  )
}

export default Post
