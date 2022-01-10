import React from 'react'
import './Image.css'

// WONT LOAD IMAGE
// Could be because image is async and is not here yet

function Image({image}) {

  console.log(image)

  return (
    <img className="post-image" src={image} />
  )
}

export default Image
