import React from 'react'
import { faTelegram, faWhatsapp, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import Icon from '../Icon'
import useSettings from '../../hooks/useSettings'
import styles from './Footer.module.css'

import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { settings } = useSettings()

  const { t, i18n } = useTranslation()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="box">
          <div className="columns">
            <div className="column is-6">
              <p className="title is-5 mobile-text-center">{t("футер.полезная информация")}</p>
              <ul>
                <li><a href="/pages/1">{t("футер.о сайте")}</a></li>
                <li><a href="/pages/2">{t("футер.для покупателя")}</a></li>
                <li><a href="/pages/3">{t("футер.для продавца")}</a></li>
                <li><a href="/pages/4">{t("футер.контакты")}</a></li>
              </ul>
            </div>
            <div className="column is-6">
              <p className="title is-5 mobile-text-center">{t("футер.связь")}</p>
              <ul>
                <li>
                  <a href={settings?.social_telegram}>
                    <Icon icon={faTelegram} />
                    <span>Telegram</span>
                  </a>
                </li>
                <li>
                  <a href={settings?.social_whatsapp}>
                    <Icon icon={faWhatsapp} />
                    <span>WhatsApp</span>
                  </a>
                </li>
                <li>
                  <a href={settings?.social_facebook}>
                    <Icon icon={faFacebook} />
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a href={settings?.social_instagram}>
                    <Icon icon={faInstagram} />
                    <span>Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p style={{ textAlign: 'center' }}>Teztender.com &copy; 2021. {t("футер.права")}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
