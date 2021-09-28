import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'

const MySettingsPage = () => {
  return (
    <Layout>
      <Header title="Настройки">
        <Breadcrumb>
          <a href="/my">Профиль</a>
          <a>Настройки</a>
        </Breadcrumb>
      </Header>
      <div className="box">
        <h4 className="title is-4">Уведомления</h4>
        <form>

          <div className="field is-grouped">
            <label className="label">Telegram</label>
            <div className="control">
              <input className="input is-success" type="text" placeholder="Text input" value="bulma" />
            </div>
          </div>
        </form>
      </div>

      <div className="box">
        <h4 className="title is-4">Уведомления</h4>
        <p>Настройка Уведомления</p>
      </div>
    </Layout>
  )
}

export default MySettingsPage
