import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TenderItem from '../TenderItem'
import Spinner from '../Spinner'
import ServiceApi from '../../services/ServiceApi'
// import './Tenders.css'

import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'

const Tenders = ({ className }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [tenders, setTenders] = useState([])
  const [limit, setLimit] = useState(5)

  const { t, i18n } = useTranslation()

  useEffect(() => {
    ServiceApi.getTenders(limit)
      .then(setTenders)
      .finally(() => setIsLoading(false))
  }, [limit])

  const classes = classNames('Tenders', className)

  const loadMore = () => {
    setLimit(limit + 5)
  }

  return (
    <div className={classes}>
      <h5 className="title is-5 has-text-centered">{t("поиск.актуальные поиски")}</h5>
      {isLoading && <Spinner />}
      {isLoading === false && tenders.length === 0 && <p>Пока нет заявок</p>}
      {tenders.map(item => <TenderItem key={item.id} {...item} />)}
      <button
          className={classNames("button is-danger")}
          onClick={loadMore}
          style={{ margin: "auto", display: "block" }}
        >
          {t("поиск.смотреть еще")}
        </button>
    </div>
  )
}

Tenders.propTypes = {
  tenders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired
  }))
}

export default Tenders
