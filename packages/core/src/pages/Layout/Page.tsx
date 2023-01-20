import React, { useState } from 'react'

import { Layout } from 'antd'
import { ViewNode } from '@lowcode/concept'

import Structure from './Structure/Structure'
import Material from './MaterialMenu/MaterialMenu'
import Canvas from './Canvas/Canvas'

import style from './Page.module.scss'

const { Sider, Content } = Layout

const Page = () => {
  const [selectNode, setSelectNode] = useState<ViewNode>()

  const handleSelect = (node?: ViewNode) => {
    setSelectNode(node)
  }

  return (
    <div className={style.layout}>
      <Layout>
        <Sider theme="light" collapsed={true} collapsedWidth={48}>
          <Structure
            selectNode={selectNode}
            changeSelectNode={handleSelect}></Structure>
        </Sider>
        <Content>
          <Canvas
            changeSelectNode={handleSelect}
            selectNode={selectNode}></Canvas>
        </Content>
        <Sider theme="light" width={250}>
          <Material
            selectNode={selectNode}
            changeSelectNode={handleSelect}></Material>
        </Sider>
      </Layout>
    </div>
  )
}

export default Page
