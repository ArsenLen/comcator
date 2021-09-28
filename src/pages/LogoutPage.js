import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import MyStorage from '../utils/Storage'
import ServiceApi from '../services/ServiceApi'

const LogoutPage = () => {
  useEffect(() => {
    ServiceApi.logout()
    MyStorage.removeItems(['token', 'user'])
    window.location.href = '/'
  }, [])
  return (
    <Layout>
      <div className="box" style={{ display: 'flex', justifyContent: 'center' }}>
        <span className="loader is-size-3" />
      </div>
    </Layout>
  )
}

export default LogoutPage
