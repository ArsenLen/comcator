import React, { useState } from 'react'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../Icon'
import useUser from '../../hooks/useUser'
import styles from './Navbar.module.css' 

import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const [navbarActive, setNavbarActive] = useState(false)
  const { user } = useUser()
  const location = useLocation()

  const handleLangChange = (lang) => {
    i18n.changeLanguage(lang)
  }
  
  const handleBurger = event => {
    event.preventDefault()
    setNavbarActive(!navbarActive)
  }

  const { t, i18n } = useTranslation()

  return (
    <nav className="root navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to={{pathname: '/', state: "logo"}} className={`${styles.navbarItem} navbar-item`}>
            <img className="logo" src="/assets/images/logo.png" alt="" />
          </Link>
          <a
            onClick={handleBurger}
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="menu"
          >
            <span aria-hidden />
            <span aria-hidden />
            <span aria-hidden />
          </a>

          <div className={`${styles.wrapperLangSelect} wrapperLangSelect`}>
            <select
              className={`${styles.langSelect} lang-select`}
              name="lang"
              value={i18n.language}
              onChange={(event) => handleLangChange(event.target.value)}
            >
              <option value="ru" id="ru-option">
                RU
              </option>
              <option value="ky" id="ky-button">
                KG
              </option>
              <option value="kz" id="kz-button">
                KZ
              </option>
            </select>
          </div>

          {/* <div className="dropdown">
              {t("current") == "ru" && <button className="dropbtn" id="ruSelect"></button>}
              {t("current") == "ky" && <button className="dropbtn" id="kySelect"></button>}
              {t("current") == "kz" && <button className="dropbtn" id="kzSelect"></button>}
              <i>&#9660;</i>
            <div className="dropdown-content">
              <button onClick={() => changeLanguage("ru")} className="flagButton" id="ruButton"></button>
              <button onClick={() => changeLanguage("ky")} className="flagButton" id="kyButton"></button>
              <button onClick={() => changeLanguage("kz")} className="flagButton" id="kzButton"></button>
            </div>
          </div> */}

          {/* Выпадающее меню  */}
        </div>
        <div className={`navbar-menu ${navbarActive ? "is-active" : ""}`}>
          <div className="navbar-end">
            {!user && (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  <span>{t("меню.меню")}</span>
                </a>
                <div className="navbar-dropdown is-right">
                  <div className="navbar-item">
                    <a href="/login">{t("меню.войти")}</a>
                  </div>
                  {location.pathname === "/registration" ? (
                    ""
                  ) : (
                    <div className="navbar-item">
                      <a href="/registration">{t("меню.регистрация")}</a>
                    </div>
                  )}
                  <div className="navbar-item">
                    <a href="/pages/5">{t("меню.оплата")}</a>
                  </div>
                </div>
              </div>
            )}

            {user && (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  <Icon icon={faUserCircle} />
                  <span>Профиль</span>
                </a>
                <div className="navbar-dropdown is-right">
                  <a href="/my" className="navbar-item">
                    <span>{t("профиль.заголовок")}</span>
                  </a>
                  <div className="navbar-item">
                    <a href="/pages/5">{t("меню.оплата")}</a>
                  </div>
                  <hr className="navbar-divider" />
                  <a href="/logout" className="navbar-item">
                    <span>{t("меню.выйти")}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
