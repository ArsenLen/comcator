import React, { useState, useEffect } from 'react'
import { IMaskInput } from 'react-imask'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'
import Icon from '../components/Icon'
import { faLock, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import SelectCategories from '../components/SelectCategories'
import SelectLocations from '../components/SelectLocations'
import Message from '../components/Message'
import classNames from 'classnames'
import { Redirect } from 'react-router-dom'
import useUser from '../hooks/useUser'
import ServiceApi from '../services/ServiceApi'
import Spinner from '../components/Spinner'
import normalizePhone from '../utils/normalizePhone'

import i18n from '../i18n'
import { useTranslation } from 'react-i18next'

const MyPage = () => {
  const [isLoadingFormPassword, setIsLoadingFormPassword] = useState(false)
  const [isLoadingFormProfile, setIsLoadingFormProfile] = useState(false)
  const [message, setMessage] = useState('')
  const [subscriberInfo, setSubscriberInfo] = useState(null)

  const { t, i18n } = useTranslation()

  const { user, isLoading: isLoadingUser, setUser } = useUser()

  useEffect(() => {
    if (user?.id) {
      ServiceApi.getSubscriberByUserId(user.id)
        .then(setSubscriberInfo)
    }
  }, [user])

  const handleSubmitPassword = event => {
    event.preventDefault()
    const formData = new window.FormData(event.target)

    if (formData.get('new_password') !== formData.get('new_password_repeat')) {
      return window.alert('Пароли не совпадают')
    }
    const userId = user.id

    setIsLoadingFormPassword(true)
    ServiceApi.updatePassword(userId, formData.get('new_password'))
      .then(() => window.alert('Пароль обновлён'))
      .catch(error => window.alert(error.message))
      .finally(() => setIsLoadingFormPassword(false))
  }

  const handleSubmitSubscriber = event => {
    event.preventDefault()
    setIsLoadingFormProfile(true)
    const formData = new window.FormData(event.target)
    if (formData.get('phone')) {
      const phone = normalizePhone(formData.get('phone'))
      ServiceApi.updateUser(user.id, { last_name: phone, email: `${phone}@m.m` })
      setUser({ ...user, last_name: phone })
      formData.delete('phone')
    }

    ServiceApi.updateSubscription(subscriberInfo.id, formData)
      .then(() => {
        window.alert('Подписка обновлена')
        window.location.reload()
      })
      .catch(error => window.alert(error.message))
      .finally(() => setIsLoadingFormProfile(false))
  }

  if (isLoadingUser) {
    return <Spinner isFullScreen />
  }

  if (!isLoadingUser && !user) {
    return <Redirect to="/" />
  }

  return (
    <Layout>
      <Header title={t("профиль.заголовок")}>
        <Breadcrumb />
      </Header>

      <div className="box">
        <h4 className="title is-4">{t("профиль.личные данные")}</h4>
        <form onSubmit={handleSubmitSubscriber}>

          <div className="field">
            <label className="label">{t("профиль.категория")}</label>
            <div className="control">
              <SelectCategories defaultValue={subscriberInfo?.category} />
            </div>
          </div>

          <div className="field">
            <label className="label">{t("профиль.регион")}</label>
            <div className="control">
              <div className="select is-fullwidth">
                <SelectLocations defaultValue={subscriberInfo?.location} />
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Телефон</label>
            <div className="control has-icons-left">
              <IMaskInput
                mask="{996} 000-000-000"
                radix="."
                unmask
                name="phone"
                placeholder="+996 ..."
                className="input"
                value={user?.last_name}
                required
              />
              <Icon icon={faPhone} className="is-small is-left" />
            </div>
          </div>

          <div className="field">
            <label className="label">WhatsApp</label>
            <div className="control has-icons-left">
              <IMaskInput
                mask="{996} 000-000-000"
                radix="."
                unmask
                placeholder="+996 ..."
                className="input"
                name="whatsapp_phone"
                value={subscriberInfo?.whatsapp_phone}
                required
              />
              <Icon icon={faWhatsapp} className="is-small is-left" />
            </div>
          </div>

          {/* <div className="field">
            <label className="label">Telegram</label>
            <p>Подключить получение сообщений о новых Поисках в Telegram. <strong><a className="has-text-danger-dark" style={{ textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer" href={`https://t.me/comcator_bot?subscribe-user-${user?.id}`}>Подключить</a></strong></p>
          </div> */}

          {message && <Message message={message} onClose={() => setMessage('')} />}

          <div className="field">
            <div className="control">
              <button className={classNames('button', { 'is-loading': isLoadingFormProfile })}>{t("профиль.кнопка")}</button>
            </div>
          </div>

        </form>
      </div>

      <div className="box">
        <h4 className="title is-4">{t("профиль.обновить пароль")}</h4>
        <form onSubmit={handleSubmitPassword}>

          <div className="field">
            <div className="control has-icons-left">
              <input
                name="new_password"
                className="input"
                type="password"
                placeholder={t("профиль.новый пароль")}
                minLength="6"
                required
              />
              <Icon icon={faLock} className="is-small is-left" />
            </div>
            <div className="control has-icons-left">
              <input
                name="new_password_repeat"
                className="input"
                type="password"
                placeholder={t("профиль.повторить пароль")}
                minLength="6"
                required
              />
              <Icon icon={faLock} className="is-small is-left" />
            </div>
          </div>

          {message && <Message message={message} onClose={() => setMessage('')} />}

          <div className="field">
            <div className="control">
              <button className={classNames('button', { 'is-loading': isLoadingFormPassword })}>{t("профиль.обновить пароль")}</button>
            </div>
          </div>

        </form>
      </div>
    </Layout>
  )
}

export default MyPage
