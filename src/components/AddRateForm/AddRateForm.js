import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames";
import Message from "../Message";
import useUser from "../../hooks/useUser";
import ServiceApi from "../../services/ServiceApi";
import FilePond from "../../components/FilePond";

import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'

const initialForm = {
  cost: "",
  description: "",
  contacts: "",
  name: "",
  additional_contacts: "",
  whatsapp: "",
  files: "",
};

const AddRateForm = () => {
  const [isLoading, setLoading] = useState(true);
  const [isExists, setIsExists] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState(initialForm);
  const [files, setFiles] = useState([]);

  const { t, i18n } = useTranslation()

  const params = useParams();
  const { user, isLoading: isLoadingUser } = useUser();
  const [subscriberInfo, setSubscriberInfo] = useState(null);

  const [currency, setCurrency] = useState(i18n.t('валюта'))
  const handleCurrency = (e) => {
    setCurrency(e.target.value)
  }

  useEffect(() => {
    if (user?.id) {
      ServiceApi.getSubscriberByUserId(user.id).then(setSubscriberInfo);
    }
  }, [user]);

  useEffect(() => {
    ServiceApi.getRate(params.id)
      .then(() => setIsExists(true))
      .catch(() => setIsExists(false))
      .finally(() => setLoading(false));

    if (user?.last_name) {
      setFormData(() => ({
        ...formData,
        contacts: user.last_name,
        name: user.first_name,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (subscriberInfo?.whatsapp_phone) {
      setFormData({
        ...formData,
        whatsapp: subscriberInfo.whatsapp_phone,
      });
    }
  }, [subscriberInfo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    let finalForm = formData;
    if (formData.cost) {
      finalForm = { ...formData, cost: `${formData.cost} ${currency}` };
    }

    if (files.length > 0) {
      finalForm.files = files.map((file) => file.serverId).join(",");
    }

    console.log(files);

    ServiceApi.addRate(params.id, finalForm)
      .then((res) => {
        setMessage("Предложение успешно отправлено");
        setFormData(initialForm);
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => setLoading(false));
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (!isLoading && isExists) {
    return (
      <div>
        <h5 className="title is-5">{t("предложение.создать")}</h5>
        <strong className="has-text-danger">
         {t("предложение.уже отправили")}
        </strong>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <h5 className="title is-5">{t("предложение.создать")}</h5>

      <div className="field">
        <label className="label">{t("предложение.имя")}</label>
        <div className="control">
          <input
            name="name"
            className="input"
            placeholder={t("предложение.имя")}
            onChange={handleChange}
            value={formData.name}
            disabled={formData.name}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Телефон</label>
        <div className="control">
          <input
            name="phone"
            className="input"
            placeholder="Телефон"
            value={formData.contacts}
            onChange={handleChange}
            disabled={formData.contacts}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">WhatsApp</label>
        <div className="control">
          <input
            name="whatsapp"
            className="input"
            placeholder="WhatsApp номер"
            onChange={handleChange}
            disabled={subscriberInfo?.whatsapp_phone}
            value={formData.whatsapp}
            required
          />
        </div>
      </div>

      <div className="field">
      <label className="label">{t("поиск.заполните")}</label>
        <div className="control">
          <textarea
            name="description"
            className="textarea"
            placeholder={t("предложение.описание")}
            value={formData.description}
            onChange={handleChange}
            rows={2}
            required
          />
        </div>
      </div>

      <div className="field has-addons">
        <div className="control">
          <input
            name="cost"
            className="input"
            placeholder={t("предложение.цена")}
            value={formData.cost}
            onChange={handleChange}
            style={{ maxWidth: 200 }}
            required
          />
        </div>
        <div className="control">
        <p className="select">
        <select className="field" value={currency} onChange={handleCurrency}>
            <option value={t("валюта")} hidden>{t("валюта")}</option>
            <option value="сом">сом</option>
            <option value="тенге">тенге</option>
            <option value="рубль">руб.</option>
        </select>
        </p>
        </div>
      </div>

      <div className="field">
        <label className="label">{t("предложение.доп контакты")}</label>
        <div className="control">
          <textarea
            name="additional_contacts"
            className="textarea"
            rows={2}
            value={formData.additional_contacts}
            placeholder={t("предложение.адрес")}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">{t("предложение.файлы")}</label>
        <FilePond
          files={files}
          maxFiles={5}
          allowMultiple
          onupdatefiles={(items) => setFiles(items)}
          labelIdle={t("предложение.перенести файл")}
        />
      </div>

      {message && <Message message={message} onClose={() => setMessage("")} />}

      {(isLoadingUser || !user) && (
        <p className="has-text-weight-bold">
          {t("предложение.необходимо")} {" "}
          <Link to="/login" style={{ textDecoration: "underline" }}>
            {t("предложение.регистрация")}
          </Link>{" "}
          ,{" "}
          <Link to="/login" style={{ textDecoration: "underline" }}>
          {t("предложение.войти")}
          </Link>{" "}
          {t("предложение.или")} {" "}
          <Link to="/pages/5" style={{ textDecoration: "underline" }}>
          {t("предложение.оплатить")}
          </Link>
        </p>
      )}

      <div
        className="buttons"
        style={{ justifyContent: "center", marginTop: 20, marginBottom: 5 }}
      >
        <button
          className={classNames("button is-danger", {
            "is-loading": isLoading,
          })}
          disabled={isLoadingUser || !user}
        >
          {t("предложение.отправить")}
        </button>
      </div>
    </form>
  );
};

export default AddRateForm;
