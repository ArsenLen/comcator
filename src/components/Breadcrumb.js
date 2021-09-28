import React from 'react'
import { Link } from 'react-router-dom'

import i18n from '../i18n'
import { useTranslation } from 'react-i18next'

const Breadcrumb = ({ children = [] }) => {

  const { t, i18n } = useTranslation()

  return (
    <nav className="breadcrumb">
      <ul>
        <li>
          <Link to="/">{t("главная")}</Link>
        </li>
        {React.Children.map(children, (child, index) => {
          const { children, ...props } = child.props
          return (
            <li key={child.key || index} className={!props.href ? 'is-active' : ''}>
              {props.href && <Link {...props}>{children}</Link>}
              {!props.href && <a href="#!">{children}</a>}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Breadcrumb
