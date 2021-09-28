import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import Header from '../components/Header'
import ServiceApi from '../services/ServiceApi'
import Spinner from '../components/Spinner'

import i18n from '../i18n'
import { useTranslation } from 'react-i18next'

export default function CustomPage () {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)

  const { t, i18n } = useTranslation()

  useEffect(() => {
    ServiceApi.getPage(id)
      .then(setData)
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (data?.title) {
      document.querySelector('meta[name=description]').setAttribute('content', data.title)
      document.querySelector('title').innerText = data.title
    }
  }, [data])

  if (isLoading) {
    return <Spinner isFullScreen />
  }

  return (
    <Layout>
      {t('current')=='ru' && data.title &&
        <Header title={data.title}>
        <nav className="breadcrumb">
          <ul>
            <li><a href="/">{t("главная")}</a></li>
          </ul>
        </nav>
        </Header>
      }
      {t('current')=='ky' && data.title_ky &&
        <Header title={data.title_ky}>
        <nav className="breadcrumb">
          <ul>
            <li><a href="/">{t("главная")}</a></li>
          </ul>
        </nav>
        </Header>
      }
      {t('current')=='kz' && data.title_kz &&
        <Header title={data.title_kz}>
        <nav className="breadcrumb">
          <ul>
            <li><a href="/">{t("главная")}</a></li>
          </ul>
        </nav>
        </Header>
      }
      
      <div className="box style2">
      {t('current')=='ru' &&
        <div className="content" dangerouslySetInnerHTML={{ __html: data?.content }} />
      }  
      {t('current')=='ky' &&
        <div className="content" dangerouslySetInnerHTML={{ __html: data?.content_ky }} />
      } 
      {t('current')=='kz' &&
        <div className="content" dangerouslySetInnerHTML={{ __html: data?.content_kz }} />
      }  
      </div>
    </Layout>
  )
}
