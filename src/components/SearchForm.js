import React, { useRef } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Icon from './Icon'
import SelectCategories from './SelectCategories'
import SelectLocations from './SelectLocations'

const SearchForm = () => {
  const ref = useRef()

  const reset = () => {
    ref.current.reset()
  }

  const handleSubmit = () => {

  }

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
    >
      <div className="field">
        <div className="control has-icons-left">
          <input
            name="q"
            className="input"
            placeholder="Ключевая фраза"
          />
          <Icon icon={faSearch} className="is-small is-left" />
        </div>
      </div>

      <div className="field">
        <div className="control has-icons-left">
          <SelectCategories />
          <Icon icon={faSearch} className="is-small is-left" />
        </div>
      </div>

      <div className="field">
        <div className="control has-icons-left">
          <input
            name="budger"
            className="input"
            placeholder="Бюджет от"
          />
          <Icon icon={faSearch} className="is-small is-left" />
        </div>
      </div>

      <div className="field">
        <div className="control has-icons-left">
          <div className="select is-fullwidth">
            <SelectLocations />
          </div>
          <Icon icon={faSearch} className="is-small is-left" />
        </div>
      </div>
      {/*
      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input type="checkbox" /> Только ваша специализация
          </label>
        </div>
      </div> */}

      <div className="buttons" style={{ justifyContent: 'space-between' }}>
        <button className="button is-primary">Применить</button>
        <a onClick={reset} className="button">Сбросить</a>
      </div>
    </form>
  )
}

export default SearchForm
