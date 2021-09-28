import React, { useState, useRef } from 'react'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { IMaskInput } from 'react-imask'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import classNames from 'classnames'
import { Redirect } from 'react-router-dom'
import Message from '../Message'
import SelectCategories from '../SelectCategories'
import SelectServiceCategories from '../SelectServiceCategories'
import SelectLocations from '../SelectLocations'
import Icon from '../Icon'
import ServiceApi from '../../services/ServiceApi'
import getErrorMessage from '../../utils/getErrorMessage'
import errorHandler from '../../utils/errorHandler'
import normzlizeForm from '../../utils/normalizeForm'
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'


const AddTenderForm = () => {
  const [isLoading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [createdId, setCreatedId] = useState(null)
  const [phone, setPhone] = useState('')
  const [whatsappPhone, setWhatsappPhone] = useState('')
  const [country, setCountry] = useState('')
  const description = useRef()

  // const [files, setFiles] = useState([])
  const { t, i18n } = useTranslation()

  const [currency, setCurrency] = useState(i18n.t('валюта'))
  const handleCurrency = (e) => {
    setCurrency(e.target.value)
  }
  
  const [toggleCategory, setToggleCategory] = useState(1)
  const toggleTab = (index) => {
    setToggleCategory(index)
  }

  const request = (formData) => {
    setLoading(true)
    let hasCanceled = false
    ServiceApi.createTender(formData)
      .then(data => {
        hasCanceled = true
        setCreatedId(data.id)
      })
      .catch(err => {
        setMessage(getErrorMessage(err))
        errorHandler(err)
      })
      .finally(() => !hasCanceled && setLoading(false))
  }

  const handleSubmit = event => {
    event.preventDefault()
    const form = event.target
    const formData = normzlizeForm(form)
    if (formData.cost) {
      formData.cost = `${formData.cost} ${currency}`
    }
    if (formData.whatsapp_phone.length < 15 && formData.phone.length < 15) {
      window.alert('Заполните номер телефона или WhatsApp номер')
    } else {
      request(formData)
      // console.log(formData);
    }
  }

  if (createdId) {
    return <Redirect to={`/published/${createdId}`} />
  }

  const inputValidityHandler = (e) => {
    if (!e.target.value) {
      e.target.setCustomValidity(t('заполните поле'))
    } else {
      e.target.setCustomValidity("")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <div className="control">
          <input
            name="name"
            className="input"
            placeholder={t("поиск.имя")}
            onInvalid={inputValidityHandler}
            title={t("заполните поле")}
            required
          />
        </div>
      </div>

      <div className="category-tab">
        <div
          className={toggleCategory === 1 ? "tab active" : "tab"}
          onClick={() => toggleTab(1)}
        >
          {t('поиск.товар')}
        </div>
        <div
          className={toggleCategory === 2 ? "tab active" : "tab"}
          onClick={() => toggleTab(2)}
        >
          {t('поиск.услуга')}
        </div>
      </div>

      {toggleCategory === 1 ? 
        <div className="field category-select" style={{ "borderColor": "white" }}>
          <label className="label">{t("поиск.выберите категорию")}</label>
          <div className="control">
            <SelectCategories required />
          </div>
        </div>
         : 
        <div className="field category-select">
          <label className="label">{t("поиск.выберите категорию")}</label>
          <div className="control">
              <SelectServiceCategories required />
          </div>
        </div>
      }

      <div className="field">
        <label className="label">{t("поиск.выберите регион")}</label>
        <div className="control">
          <SelectLocations required />
        </div>
      </div>

      <div className="field">
        <label className="label">{t("поиск.заполните")}</label>
        <div className="control">
          <textarea
            name="description"
            className="textarea"
            rows={2}
            // onFocus={(e) => {
            //   if (description.current.value === "") {
            //     description.current.value = t("поиск.куплю");
            //   }
            // }}
            // onChange={(e) => {
            //   if (description.current.value.length < 6) {
            //     description.current.value = t("поиск.куплю");
            //   }
            //   if (!description.current.value.startsWith(t("поиск.куплю"))) {
            //     description.current.value = t("поиск.куплю");
            //   }
            // }}
            ref={description}
            placeholder={t("поиск.описание куплю")}
            onInvalid={inputValidityHandler}
            // defaultValue="Куплю "
            required
          />
        </div>
      </div>

      <div className="field has-addons">
        <div className="control">
          <input
            name="cost"
            type="number"
            className="input"
            placeholder={t("поиск.цена")}
            style={{ maxWidth: 200 }}
          />
        </div>
        <p className="select">
          <select className="field" value={currency} onChange={handleCurrency}>
            <option value={t("валюта")} hidden>
              {t("валюта")}
            </option>
            <option value="сом">сом</option>
            <option value="тенге">тенге</option>
            <option value="рубль">руб.</option>
          </select>
        </p>
      </div>

      <div className="field">
        <label className="label">{t("поиск.дополнительные условия")}</label>
        <label className="checkbox">
          <input
            type="checkbox"
            name="additional_options[]"
            defaultValue="delivery"
          />{" "}
          {t("поиск.доставка")}
        </label>
        &nbsp;
        <label className="checkbox">
          <input
            type="checkbox"
            name="additional_options[]"
            defaultValue="install"
          />{" "}
          {t("поиск.установка")}
        </label>
        &nbsp;
        <label className="checkbox">
          <input
            type="checkbox"
            name="additional_options[]"
            defaultValue="installments"
          />{" "}
          {t("поиск.рассрочка")}
        </label>
        &nbsp;
        <label className="checkbox">
          <input
            type="checkbox"
            name="additional_options[]"
            defaultValue="credit"
          />{" "}
          {t("поиск.в кредит")}
        </label>
        &nbsp;
        <label className="checkbox">
          <input
            type="checkbox"
            name="additional_options[]"
            defaultValue="wholesale"
          />{" "}
          {t("поиск.оптом")}
        </label>
        &nbsp;
        <label className="checkbox">
          <input
            type="checkbox"
            name="additional_options[]"
            defaultValue="tender"
          />{" "}
          {t("поиск.тендер")}
        </label>
      </div>

      <div className="field">
        <label className="label">{t("поиск.телефон")}</label>
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
            localization={{ Kyrgyzstan: "+", Kazakhstan: "+", Russia: "+" }}
            masks={{
              kg: "...-...-...",
              kz: "... ...-..-..",
              ru: "... ...-..-..",
            }}
            prefix={""}
            countryCodeEditable={false}
            dropdownStyle={{ color: "black" }}
            className="input"
          />
        </div>
      </div>
      <div className="andor">{t("поиск.и/или")}</div>
      <div className="field">
        <label className="label">{t("поиск.вотсап")}</label>
        <div className="control has-icons-left">
          <PhoneInput
            inputProps={{
              name: "whatsapp_phone",
              required: true,
            }}
            value={whatsappPhone}
            onTextChange={(whatsappPhone) => setPhone(whatsappPhone)}
            onCountryChange={(country) => setCountry(country)}
            country={t("currentPhone")}
            onlyCountries={["kg", "kz", "ru"]}
            localization={{ Kyrgyzstan: "+", Kazakhstan: "+", Russia: "+" }}
            masks={{
              kg: "...-...-...",
              kz: "... ...-..-..",
              ru: "... ...-..-..",
            }}
            prefix={""}
            countryCodeEditable={false}
            dropdownStyle={{ color: "black" }}
            className="input"
          />
        </div>
      </div>

      <div className="field">
        <label className="checkbox">
          <input type="checkbox"/> {t("поиск.подписаться")}{" "}
          {/* <a href="/pages/6" style={{ textDecoration: "underline" }}>
            {t("поиск.правила")}
          </a> */}
          {/* {t("поиск.макулмун")} */}
        </label>
      </div>

      {message && <Message message={message} onClose={() => setMessage("")} />}

      <div
        className="buttons"
        style={{ justifyContent: "center", marginBottom: 0 }}
      >
        <button
          className={classNames("button is-danger", {
            "is-loading": isLoading,
          })}
        >
          {t("поиск.начать поиск")}
        </button>
      </div>
    </form>
  );
}

export default AddTenderForm
