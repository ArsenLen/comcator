import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import Header from '../components/Header'

import i18n from '../i18n'
import { useTranslation } from 'react-i18next'

export default function PublishedPage () {
  const { id } = useParams()

  const { t, i18n } = useTranslation()

  return (
    <Layout>
      <Header>
        <h4 className="title is-4">{t("поиск.успешно")}</h4>
        <nav className="breadcrumb">
          <ul>
            <li>
              <a href="/">{t("главная")}</a>
            </li>
          </ul>
        </nav>
      </Header>
      <div className="box">
        <p>
          {t("поиск.ваш поиск")} {id} <strong><Link to={`/tenders/${id}`}>{t("поиск.посмотреть")}</Link></strong>
        </p>
        <p>{t("поиск.произведена рассылка")}</p>
        <p>{t("поиск.ожидайте предложения")}</p>
      </div>
    </Layout>
  )
}
