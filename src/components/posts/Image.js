import React from 'react'
import './Image.css'

// WONT LOAD IMAGE
// Could be because image is async and is not here yet

function Image({planet, image}) {

  return (
    <img className={"post-image "+planet+"-image"} src={image} />
  )
}

export default Image
