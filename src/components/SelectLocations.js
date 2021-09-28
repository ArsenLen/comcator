import React, { useState, useEffect } from 'react'
import ServiceApi from '../services/ServiceApi'
import i18n from '../i18n'
import { useTranslation } from 'react-i18next'

function renderLocations (items, delimiter = '') {
  return items.map(({ name, id, children = [] }) => {
    return (
      <React.Fragment key={id}>
        <option key={id} value={id}>{delimiter}{name}</option>
        {/* {children.length > 0 && renderLocations(children, `${delimiter}- `)} */}
      </React.Fragment>
    )
  })
}

function renderLocationsKy (items, delimiter = '') {
  return items.map(({ name_ky, id, children = [] }) => {
    return (
      <React.Fragment key={id}>
        <option key={id} value={id}>{delimiter}{name_ky}</option>
        {/* {children.length > 0 && renderLocations(children, `${delimiter}- `)} */}
      </React.Fragment>
    )
  })
}

function renderLocationsKz (items, delimiter = '') {
  return items.map(({ name_kz, id, children = [] }) => {
    return (
      <React.Fragment key={id}>
        <option key={id} value={id}>{delimiter}{name_kz}</option>
        {/* {children.length > 0 && renderLocations(children, `${delimiter}- `)} */}
      </React.Fragment>
    )
  })
}

const SelectLocations = (props) => {
  const [items, setItems] = useState([])
  const [children, setChildren] = useState([])

  const handleChangeParent = event => {
    const parentId = parseInt(event.target.value)
    const selectedLocation = items.find(item => item.id === parentId)
    if (selectedLocation.children) {
      setChildren(selectedLocation.children)
    }
  }

  useEffect(() => {
    ServiceApi.getLocations().then(setItems)
  }, [])

  const { t, i18n } = useTranslation()

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
      name="location"
      defaultValue=""
      {...props}
      onChange={handleChangeParent}
      onInvalid={selectValidityHandler}
    >
      <option disabled value="">{t('поиск.регион поиска')}</option>
      {t("current") == "ru" && renderLocations(items)}
      {t("current") == "ky" && renderLocationsKy(items)}
      {t("current") == "kz" && renderLocationsKz(items)}
    </select>
    </div>

    {children?.length > 0 && (
      <div className="select is-fullwidth">
        <select
          name="location"
          {...props}
          defaultValue={children[0].parent}
        >
          <option value={children[0].parent}>{t('поиск.регион')}</option>
        {t("current") == "ru" && renderLocations(children)}
        {t("current") == "ky" && renderLocationsKy(children)}
        {t("current") == "kz" && renderLocationsKz(children)}
        </select>
      </div>
    )}
</>
  )
}

export default SelectLocations
