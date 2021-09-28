import React from 'react'
import './Spinner.css'

export default function Spinner ({ caption = null, isFullScreen = false }) {
  return (
    <div className={`Spinner ${isFullScreen ? 'is-fullscreen' : ''}`}>
      <div className="Spinner-loading loader" />
      {caption ? <div className="Spinner-caption">{caption}</div> : null}
    </div>
  )
}
