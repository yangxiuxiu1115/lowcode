import React from 'react'

import { Layout } from 'antd'
import Structure from './Structure/Structure'
import Material from './Material/Material'

import style from './Page.module.scss'

const { Sider, Content } = Layout

const Page = () => {
  return (
    <div className={style.layout}>
      <Layout>
        <Sider theme="light">
          <Structure></Structure>
        </Sider>
        <Content></Content>
        <Sider theme="light">
          <Material></Material>
        </Sider>
      </Layout>
    </div>
  )
}

export default Page
