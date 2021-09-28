import React from 'react'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import Icon from '../Icon'
// import './Attachments.css'

const FileItem = ({ size, name, type, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Icon icon={faFile} /> {name}
    </a>
  )
}

const Attachments = ({ files = [] }) => {
  return (
    <div className="Attachments">
      {files.map((file, index) => <FileItem key={index} {...file} />)}
    </div>
  )
}

export default Attachments
