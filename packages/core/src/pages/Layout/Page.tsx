import React from 'react'

import { Layout } from 'antd'
import Structure from './Structure/Structure'
import Material from './MaterialMenu/MaterialMenu'
import Canvas from './Canvas/Canvas'

import style from './Page.module.scss'

const { Sider, Content } = Layout

const Page = () => {
  return (
    <div className={style.layout}>
      <Layout>
        <Sider theme="light">
          <Structure></Structure>
        </Sider>
        <Content>
          <Canvas></Canvas>
        </Content>
        <Sider theme="light" width={250}>
          <Material></Material>
        </Sider>
      </Layout>
    </div>
  )
}

export default Page
