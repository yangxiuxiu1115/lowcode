import React from 'react'

import { Layout } from 'antd'
import Structure from './Structure/Structure'
import Material from './Material/Material'
import Toolbar from '../Toolbar/Toolbar'

import style from './Page.module.scss'

const { Header, Sider, Content } = Layout

const Page = () => {
  return (
    <div className={style.layout}>
      <Layout>
        <Header>
          <Toolbar></Toolbar>
        </Header>
        <Layout>
          <Sider theme="light">
            <Structure></Structure>
          </Sider>
          <Content></Content>
          <Sider theme="light">
            <Material></Material>
          </Sider>
        </Layout>
      </Layout>
    </div>
  )
}

export default Page
