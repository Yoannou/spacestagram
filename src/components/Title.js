import React from 'react'
import './Title.css'

function Title({main, sub}) {
  return (
    <div className="title">
      <h1>{main}</h1>
      <p>{sub}</p>
    </div>
  )
}

export default Title