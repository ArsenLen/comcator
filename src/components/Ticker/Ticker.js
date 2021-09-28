import React, { useState } from 'react'
import useSettings from '../../hooks/useSettings'
import styles from './Ticker.module.css'
import { zip } from 'lodash'
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'

const Ticker = () => {
  const { settings } = useSettings()

  const { t, i18n } = useTranslation()

  if (!settings?.ticker || !settings?.ticker_ky || !settings?.ticker_kz) { return null }
  const text = settings.ticker || ''
  const html = text.replace(/\n\n/g, `<span class="${styles.separator}"></span>`)
  const textKy = settings.ticker_ky || ''
  const htmlKy = textKy.replace(/\n\n/g, `<span class="${styles.separator}"></span>`)
  const textKz = settings.ticker_kz || ''
  const htmlKz = textKz.replace(/\n\n/g, `<span class="${styles.separator}"></span>`)

  return (
    <div className={styles.wrap}>
      {t('current')=='ru' && settings.ticker && 
      <div className={styles.ticker} dangerouslySetInnerHTML={{ __html: html }} />
    }
     {t('current')=='ky' && settings.ticker_ky && 
      <div className={styles.ticker} dangerouslySetInnerHTML={{ __html: htmlKy }} />
    }
    {t('current')=='kz' && settings.ticker_kz && 
      <div className={styles.ticker} dangerouslySetInnerHTML={{ __html: htmlKz }} />
    }
    </div>
  )
}

export default Ticker