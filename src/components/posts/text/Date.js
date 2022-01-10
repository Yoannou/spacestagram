import React from 'react'

function Date({date}) {
  return (
    <div className="post-date-wrapper">
      <h4 className="post-date">
        {date}
      </h4>
    </div>
  )
}

export default Date
