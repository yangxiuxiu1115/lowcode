import React, { FC, ReactNode } from 'react'
import { Tabs, Empty } from 'antd'
import { ViewNode } from '@lowcode/concept'

import style from './MaterialMenu.module.scss'

interface ITabType {
  label: string
  key: string
  children?: ReactNode
}
const tabs: ITabType[] = [{ label: '属性', key: 'attribute' }]

const MaterialMenu: FC<{ selectNode?: ViewNode }> = ({ selectNode }) => {
  return (
    <div className={style.materialMenu}>
      {selectNode ? (
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
      ) : (
        <Empty description={'暂未选中节点'} />
      )}
    </div>
  )
}

export default MaterialMenu
