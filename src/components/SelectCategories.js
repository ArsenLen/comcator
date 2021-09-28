import React, { useState, useEffect } from 'react'
import ServiceApi from '../services/ServiceApi'
import i18n from '../i18n'
import { useTranslation } from 'react-i18next'



function renderCategories (items, delimiter = '') {
  return items.filter((item) => !item.is_service).map(({ name, id, children = [] }) => {
    return (
      <React.Fragment key={id}>
        <option key={id} value={id}>{delimiter}{name}</option>
        {/* {children.length > 0 && renderCategories(children, `${delimiter}- `)} */}
      </React.Fragment>
    )
  })
}

function renderCategoriesKy (items, delimiter = '') {
  return items.filter((item) => !item.is_service).map(({ name_ky, id, children = [] }) => {
    return (
      <React.Fragment key={id}>
        <option key={id} value={id}>{delimiter}{name_ky}</option>
        {/* {children.length > 0 && renderCategories(children, `${delimiter}- `)}  */}
      </React.Fragment>
    )
  })
}

function renderCategoriesKz (items, delimiter = '') {
  return items.filter((item) => !item.is_service).map(({ name_kz, id, children = [] }) => {
    return (
      <React.Fragment key={id}>
        <option key={id} value={id}>{delimiter}{name_kz}</option>
        {/* {children.length > 0 && renderCategories(children, `${delimiter}- `)} */}
      </React.Fragment>
    )
  })
}

const SelectCategories = (props) => {
  const [categories, setCategories] = useState([])
  const [children, setChildren] = useState([])

  const [childOption, setChildOption] = useState('')

  const handleChangeParent = event => {
    const parentId = parseInt(event.target.value)
    const selectedCategory = categories.find(item => item.id === parentId)
    if (selectedCategory.children) {
      setChildren(selectedCategory.children)
    }
  }

  const { t, i18n } = useTranslation()

  useEffect(() => {
    ServiceApi.getCategories().then(setCategories)
  }, [])

  const selectValidityHandler = (e) => {
    if (!e.target.value) {
      e.target.setCustomValidity(t('выберите пункт'))
    } else {
      e.target.setCustomValidity("")
    }
  }

  return (
    <>
      <div className="select is-fullwidth">
        <select
          name="category"
          defaultValue=""
          {...props}
          onChange={handleChangeParent}
          onInvalid={selectValidityHandler}
        >
          <option disabled value="">{t('поиск.категория товара')}</option>
          {t("current") == "ru" && renderCategories(categories)}
          {t("current") == "ky" && renderCategoriesKy(categories)}
          {t("current") == "kz" && renderCategoriesKz(categories)}
        </select>
      </div>
      {children?.length > 0 && (
        <div className="select is-fullwidth">
          <select
            name="category"
            defaultValue={children[0].parent}
            // value={childOption}
            // onChange={handleChangeChild}
          >
            <option value={children[0].parent}>{t('поиск.подкатегория')}</option>
            {t("current") == "ru" && renderCategories(children)}
            {t("current") == "ky" && renderCategoriesKy(children)}
            {t("current") == "kz" && renderCategoriesKz(children)}
          </select>
        </div>
      )}
    </>
  )
}

export default SelectCategories
