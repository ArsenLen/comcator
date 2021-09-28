import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'

export default function NotFoundPage () {
  return (
    <Layout>
      <Header>
        <Breadcrumb />
      </Header>
      <div className="box">
        <h4 className="title is-4">Страница не найдена</h4>
      </div>
    </Layout>
  )
}
