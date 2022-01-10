import React from 'react'
import Heading from './Heading.js'
import Date from './Date.js'
import Description from './Description.js'
import './Text.css'

function Text({heading, date, description}) {
  return (
    <div className="post-text">
      <Heading heading={heading}/>
      <Date date={date}/>
      <Description description={description}/>
    </div>
  )
}

export default Text
