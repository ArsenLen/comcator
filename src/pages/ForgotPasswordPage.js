import React, { useRef, useState } from 'react'
import { IMaskInput } from 'react-imask'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import Icon from '../components/Icon'
import Message from '../components/Message'
import classNames from 'classnames'
import Header from '../components/Header'
import Box from '../components/Box'
import Layout from '../components/Layout'
import ServiceApi from '../services/ServiceApi'

import i18n from '../i18n'
import { useTranslation } from 'react-i18next'

const ForgotPasswordPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const refForm = useRef()

  const { t, i18n } = useTranslation()
 
  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)

    const form = event.target
    const formData = new window.FormData(form)
    ServiceApi.forgotPassword(formData)
      .then(() => {
        window.alert('Новый пароль отправлен на ваш WhatsApp номер!')
        refForm.current.reset()
      })
      .catch(() => window.alert('Пользователь с этим номером не найден'))
      .finally(() => setLoading(false))
  }
  return (
    <Layout>
      <Header
        title={t("восстановление.заголовок")}
      />
      <Box>
        <section>
          <form
            className="LoginForm"
            onSubmit={handleSubmit}
            ref={refForm}
          >
            <div className="field">
              <label className="label">{t("восстановление.вотсап")}</label>
              <div className="control has-icons-left">
                <IMaskInput
                  mask="{996} 000-000-000"
                  radix="."
                  unmask
                  placeholder="+996 ..."
                  className="input"
                  name="whatsapp_phone"
                  style={{ maxWidth: 200 }}
                  required
                />
                <Icon icon={faWhatsapp} className="is-small is-left" />
              </div>
            </div>
            {message && <Message message={message} onClose={() => setMessage('')} />}
            <div className="field">
              <div className="control">
                <button className={classNames('button', { 'is-loading': isLoading })}>{t("восстановление.кнопка")}</button>
              </div>
            </div>
          </form>
        </section>
      </Box>
    </Layout>
  )
}

export default ForgotPasswordPage
