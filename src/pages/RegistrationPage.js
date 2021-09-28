import React, { useState } from "react";
import classNames from "classnames";
import { IMaskInput } from "react-imask";
import { faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Breadcrumb from "../components/Breadcrumb";
import Icon from "../components/Icon";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Box from "../components/Box";
import SelectCategories from "../components/SelectCategories";
import SelectServiceCategories from "../components/SelectServiceCategories";
import SelectLocations from "../components/SelectLocations";
import ServiceApi from "../services/ServiceApi";
import Message from "../components/Message";
import useUser from "../hooks/useUser";
import normzlizeForm from '../utils/normalizeForm'

import i18n from '../i18n'
import { useTranslation } from 'react-i18next'

export default function RegistrationPage() {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { setUser } = useUser();
  const [phone, setPhone] = useState('')
  const [whatsappPhone, setWhatsappPhone] = useState('')
  const [country, setCountry] = useState('')

  const { t, i18n } = useTranslation()

  const [toggleCategory, setToggleCategory] = useState(1)
  const toggleTab = (index) => {
    setToggleCategory(index)
  }

  const onSuccess = (res) => {
    if (res.token) {
      setUser(res);
    }
    window.location.href = "/";
    return null;
  };

  const onError = (err) => {
    if (err.response?.data?.error?.code === 204) {
      setMessage("Вы уже зарегистрированы");
    } else {
      setMessage(
        "Не удалось зарегистрироваться, попробуйте ввести другой номер телефона"
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target
    const formDaty = normzlizeForm(form)
    const formData = new window.FormData(event.target);
    
    ServiceApi.registration(formData)
      .then(onSuccess)
      .catch(onError)
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <Header title={t("регистрация.заголовок")}>
        <Breadcrumb />
      </Header>
      <Box>
        <section>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="role" value="3" />

            <div className="field">
              <div className="control has-icons-left">
                <input
                  name="name"
                  className="input"
                  placeholder={t("регистрация.имя")}
                  required
                />
                <Icon icon={faUser} className="is-small is-left" />
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
              <div className="field active-category">
                <label className="label">{t("регистрация.выберите категорию")}</label>
                <div className="control">
                  <SelectCategories required />
                </div>
              </div>
            : 
              <div className="field active-category">
                 <label className="label">{t("регистрация.выберите категорию")}</label>
                <div className="control">
                  <SelectServiceCategories required />
                </div>
              </div>
            }

            <div className="field">
              <label className="label">{t("поиск.выберите регион")}</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <SelectLocations required />
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">{t("регистрация.номер")}</label>
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
            dropdownStyle={{ color: "black" }}
            className="input"
          />
               </div>
            </div>

            <div className="field">
              <label className="label">{t("регистрация.вотсап")}</label>
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
            localization={{'Kyrgyzstan': '+', 'Kazakhstan': '+', 'Russia' : '+'}}
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
              <label className="label">{t("регистрация.пароль")}</label>
              <div className="control has-icons-left">
                <input
                  name="password"
                  className="input"
                  type="password"
                  placeholder={t("регистрация.придумайте пароль")}
                  minLength="6"
                  required
                />
                <Icon icon={faLock} className="is-small is-left lock-icon" />
              </div>
            </div>

            <div className="field">
              <label className="checkbox">
                <input type="checkbox" required /> {t("регистрация.согласен")}{" "}
                <a href="/pages/7" style={{ textDecoration: "underline" }}>
                {t("регистрация.правила")}
                </a>
                {t("регистрация.макулмун")}
              </label>
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
                    {t("регистрация.кнопка")}
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
