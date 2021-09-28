import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/ru'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Icon from '../components/Icon'
// import AddRateFrom from '../../components/AddRateForm'
import ServiceApi from '../services/ServiceApi'
import Spinner from '../components/Spinner'
import AddRateForm from '../components/AddRateForm'
import useUser from '../hooks/useUser'

import i18n from '../i18n'
import { useTranslation } from 'react-i18next'

export default function TenderPage () {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [tender, setTender] = useState(null)
  const { id } = useParams()
  const history = useHistory()

  const { t, i18n } = useTranslation()

  useEffect(() => {
    ServiceApi.getTender(id)
      .then(setTender)
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <Spinner isFullScreen />
  }

  if (!isLoading && !tender) {
    history.push('/404')
    return null
  }

  return (
    <Layout>
      <Header title={t("поиск.поиск №")+`${id}`}>
        <nav className="breadcrumb">
          <ul>
            <li><a href="/#tenders">{t("поиск.все поиски")}</a></li>
          </ul>
        </nav>
      </Header>
      <div className="columns">
        <div className="column">
          <div className="box">
            <p><b>{t("поиск.опубликован")}</b>: {moment(tender.created_on).locale('ru').format('LLL')}</p>
          </div>

          <div className="box">
            <p><b>{t("поиск.покупатель")}</b>: {tender.name}</p>
            {/* {user && tender?.phone && (<p><b>Телефон</b>: {tender.phone}</p>)} */}
            <p><b>{t("поиск.категория")}</b>: {tender.category.name}</p>
            <p><b>{t("поиск.регион")}</b>: {tender.location.name}</p>
            <p><b>{t("поиск.желаемая цена")}</b>: {tender.cost || t("поиск.договорная")}</p>
          </div>

          <div className="box">
            <h5 className="title is-5">{t("поиск.описание")}</h5>
            <p>{tender.description}</p>
            {tender.additional_options.length > 0 && <b>{t("поиск.дополнительные условния")}</b>}
            {tender.additional_options.includes('delivery') && <p><Icon icon={faCheck} />{t("поиск.доставка")} Доставка</p>}
            {tender.additional_options.includes('install') && <p><Icon icon={faCheck} />{t("поиск.установка")} Установка</p>}
            {tender.additional_options.includes('installments') && <p><Icon icon={faCheck} />{t("поиск.рассрочка")} Рассрочка</p>}
            {tender.additional_options.includes('credit') && <p><Icon icon={faCheck} />{t("поиск.в кредит")} В кредит</p>}
            {tender.additional_options.includes('wholesale') && <p><Icon icon={faCheck} />{t("поиск.оптом")}Оптом</p>}
            {tender.additional_options.includes('tender') && <p><Icon icon={faCheck} />{t("поиск.тендер")} Тендер</p>}
          </div>
        </div>
      </div>
      {tender?.whatsapp_phone && (
        <div className="box">
          <AddRateForm />
        </div>
      )}

    </Layout>
  )
}
