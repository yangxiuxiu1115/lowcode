import React, { FC, ReactNode } from 'react'
import { Tabs } from 'antd'
import { ViewNode } from '@lowcode/concept'

import style from './MaterialMenu.module.scss'
import Material from './Material/Material'

type tabType = { label: string; key: string; children?: ReactNode }
const tabs: tabType[] = [
  { label: '物料', key: 'material', children: <Material /> },
  { label: '属性', key: 'attribute' },
]

const MaterialMenu: FC<{ selectNode?: ViewNode }> = ({ selectNode }) => {
  return (
    <div className={style.materialMenu}>
      <Tabs
        type="card"
        items={tabs.filter((tab) => {
          if (tab.key === 'attribute') {
            if (selectNode) return true
            return false
          }
          return true
        })}
      />
    </div>
  )
}

export default MaterialMenu
