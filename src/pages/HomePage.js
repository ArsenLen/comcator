import React, {useEffect} from 'react'
import Layout from '../components/Layout'
import Slideshow from '../components/Slideshow'
import AddTenderForm from '../components/AddTenderForm'
import Ticker from '../components/Ticker'
import Tenders from '../components/Tenders'
import i18n from '../i18n'
import { useTranslation } from 'react-i18next'
import axios from "axios"

import { useHistory ,useLocation } from 'react-router-dom'

async function location() {
  try {
    const response = await axios.get('https://ipapi.co/json/');
    console.log(response.data.country)
    if(response.data.country == "RU") {
      return "ru"
    }
    if(response.data.country == "KG") {
      return "ky"
    }
    if(response.data.country == "KZ") {
      return "kz"
    }
    return "ru"
  } catch (error) {
    console.error(error);
  }
}

const HomePage = () => {

  const history = useHistory()

console.log(history.location.state)

  useEffect(() => {
    if(history.location.state != "logo") {
    location().then(response => i18n.changeLanguage(response))
  }
  }, []);
  const { t, i18n } = useTranslation()

  return (
    <Layout>
      <Ticker />
      <div className="columns">
        <div className="column is-4">
          <div className="box">
            <h5 className="title is-5 has-text-centered" style={{ textTransform: 'uppercase' }}>{t("поиск.заголовок")}</h5>
            <AddTenderForm />
          </div>
          <div>
          <Slideshow />
          </div>
        </div>
        <div id="tenders" className="column home-column-2">
          <Slideshow />
          <Tenders className="box" />
          {/* <Slideshow /> */}
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
