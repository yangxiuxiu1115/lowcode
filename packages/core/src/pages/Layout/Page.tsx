import React, { useState } from 'react'

import { Layout } from 'antd'
import { ViewNode } from '@lowcode/concept'

import Structure from './Structure/Structure'
import Material from './MaterialMenu/MaterialMenu'
import Canvas from './Canvas/Canvas'

import style from './Page.module.scss'

const { Sider, Content } = Layout

const Page = () => {
  const [collapsed, setCollapsed] = useState(true)
  const [selectNode, setSelectNode] = useState<ViewNode>()

  const handleSelect = (node: ViewNode | undefined) => {
    setSelectNode(node)
  }

  return (
    <div className={style.layout}>
      <Layout>
        <Sider
          theme="light"
          style={{ boxShadow: '0px 1px 5px' }}
          collapsible
          width={250}
          collapsedWidth={60}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}>
          <Structure selectNode={selectNode}></Structure>
        </Sider>
        <Content>
          <Canvas handleSelect={handleSelect} selectNode={selectNode}></Canvas>
        </Content>
        <Sider theme="light" width={250} style={{ boxShadow: '0px 1px 5px' }}>
          <Material selectNode={selectNode}></Material>
        </Sider>
      </Layout>
    </div>
  )
}

export default Page
