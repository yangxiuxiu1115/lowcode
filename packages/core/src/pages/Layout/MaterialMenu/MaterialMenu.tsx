import React, { FC, ReactNode } from 'react'
import { Tabs } from 'antd'
import { ViewNode } from '@lowcode/concept'

import style from './Material.module.scss'

type tabType = { label: string; key: string; children?: ReactNode }
const tabs: tabType[] = [
  { label: '物料', key: 'material' },
  { label: '属性', key: 'attribute' },
]

const MaterialMenu: FC<{ selectNode?: ViewNode }> = ({ selectNode }) => {
  return (
    <div className={style.material}>
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
