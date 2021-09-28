import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { IMaskInput } from 'react-imask'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { faLock, faPhone } from '@fortawesome/free-solid-svg-icons'
import Icon from '../components/Icon'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Box from '../components/Box'
import Message from '../components/Message'
import ServiceApi from '../services/ServiceApi'
import errorHandler from '../utils/errorHandler'
import Breadcrumb from '../components/Breadcrumb'

import i18n from '../i18n'
import { useTranslation } from 'react-i18next'

const LoginPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)
  const refForm = useRef()

  const { t, i18n } = useTranslation()

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)

    const form = event.target
    const formData = new window.FormData(form)

    ServiceApi.login(formData)
      .then(data => {
        setLoading(false)
        if (data && data.token) {
          refForm.current.reset()
          setIsAuthorized(true)
        } else {
          window.alert('Нет токена')
        }
      })
      .catch(err => {
        if (err?.response?.data?.error?.code === 103) {
          setMessage('Ваш аккаунт ожидает модерации')
        } else {
          setMessage('Неверный логин или пароль')
        }
        errorHandler(err)
        setLoading(false)
      })
  }

  if (isAuthorized) {
    window.location.href = '/'
    return null
  }

  return (
    <Layout>
      <Header title="Авторизация">
        <Breadcrumb />
      </Header>
      <Box>
        <section>
          <form className="LoginForm" onSubmit={handleSubmit} ref={refForm}>

            <div className="field">
              <label className="label">{t("авторизация.номер")}</label>
              <div className="control has-icons-left">
                <PhoneInput
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  value={phone}
                  onTextChange={(phone) => setPhone(phone)}
                  onCountryChange={(country) => setCountry(country)}
                  country={t("currentPhone")}
                  onlyCountries={["kg", "kz", "ru"]}
                  localization={{'Kyrgyzstan': '+', 'Kazakhstan': '+', 'Russia' : '+'}}

                  masks={{
                    kg: "...-...-...",
                    kz: "... ...-..-..",
                    ru: "... ...-..-..",
                  }}
                  prefix={""}
                  countryCodeEditable={false}
                  dropdownStyle={{ color: "black"}}
                  inputStyle={{ width: "100%" }}
                  className="input"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">{t("авторизация.пароль")}</label>
              <div className="control has-icons-left">
                <input
                  name="password"
                  className="input"
                  type="password"
                  placeholder="******"
                  minLength="6"
                  required
                />
                <Icon icon={faLock} className="is-small is-left lock-icon" />
              </div>
              <p className="help">
                {t("авторизация.забыли пароль")} {" "}
                <Link
                  to="/forgot-password"
                  style={{ textDecoration: "underline" }}
                >
                  {t("авторизация.восстановить")}
                </Link>
              </p>
            </div>

            {message && (
              <Message message={message} onClose={() => setMessage("")} />
            )}

            <div className="field">
              <div className="control">
                <center>
                  <button
                    className={classNames("button is-danger", {
                      "is-loading": isLoading,
                    })}
                  >
                    {t("авторизация.кнопка")}
                  </button>
                </center>
              </div>
            </div>
          </form>
        </section>
      </Box>
    </Layout>
  );
}

export default LoginPage
