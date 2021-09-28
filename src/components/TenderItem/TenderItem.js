import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './TenderItem.module.css'

import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'

const TenderItem = ({ id, name, description, cost }) => {

  const { t, i18n } = useTranslation()

  return (
    <article className={styles.item}>
      <Link to={`/tenders/${id}`} className="title is-5">{t("поиск.поиск №")}{id}</Link>
      <p>
        {description}
      </p>

      <div className={styles.bottom}>
        <span><b>{t("поиск.покупатель")}</b>: {name}</span>
        {cost && <div className={styles.price} title="Бюджет">{cost}</div>}
      </div>
    </article>
  )
}

TenderItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cost: PropTypes.string
}

export default TenderItem
