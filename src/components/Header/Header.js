import React from 'react'
import styles from './Header.module.css'

const Header = ({ children, title, subtitle = null }) => {
  return (
    <header className={`${styles.header} box`}>
      {title && <h1 className="title is-4">{title}</h1>}
      {subtitle && <div className="title is-6">{subtitle}</div>}
      {children}
    </header>
  )
}

export default Header
