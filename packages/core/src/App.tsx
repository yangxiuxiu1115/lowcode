import React from 'react'
import Page from './pages/Layout/Page'
import Toolbar from './pages/Toolbar/Toolbar'

import { Layout } from 'antd'

const { Header } = Layout
function Root () {
  return (
    <Layout style={{ height: '100%' }}>
      <Header>
        <Toolbar />
      </Header>
      <Page />
    </Layout>
  )
}

export default Root
