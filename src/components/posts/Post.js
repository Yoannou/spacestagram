import React from 'react'
import Image from './Image.js'
import LikeBar from './LikeBar.js'
import Text from './text/Text.js'
import './Post.css'

function Post({planet, image, heading, date, description, id}) {
  
  
  
  return (
    <div className="post-wrapper">
      <div className="post">
        <Image planet={planet} image={image}/>
        <LikeBar image={image} id={id} />
        <Text heading={heading} date={date} description={description}/>
      </div>
    </div>
  )
}

export default Post
