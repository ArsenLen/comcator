import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Icon = ({ icon, className, ...props }) => {
  const classNames = 'icon' + (className ? ` ${className}` : '')

  return (
    <span className={classNames}>
      <FontAwesomeIcon icon={icon} {...props} />
    </span>
  )
}

export default Icon
