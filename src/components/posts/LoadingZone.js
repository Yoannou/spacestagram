import React from 'react'
import './LoadingZone.css'

function LoadingZone({action}) {
  return (
    <div className="loading-zone" onClick={action}></div>
  )
}

export default LoadingZone
