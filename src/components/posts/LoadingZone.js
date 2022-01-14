import React from 'react'
import './LoadingZone.css'

function LoadingZone({action}) {
  return (
    <div className="loading-zone">
      <button className="loading-button" onClick={action}>
        <p>Load More</p>
      </button>
    </div>
  )
}

export default LoadingZone
