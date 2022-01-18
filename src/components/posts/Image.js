import React from 'react'
import './Image.css'

function Image({planet, image}) {

  return (
    <img className={"post-image "+planet+"-image"} alt={"A picture of " + planet} src={image} />
  )
}

export default Image
