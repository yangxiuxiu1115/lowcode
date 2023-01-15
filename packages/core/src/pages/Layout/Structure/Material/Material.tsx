import React, { DragEvent, FC } from 'react'

import { List, Card } from 'antd'
import materialMenu from '@lowcode/material'
import { ViewNode, ViewNodeType } from '@lowcode/concept'

import style from './Material.module.scss'

const { Meta } = Card

interface IMaterialProps {
  resetMenu: () => void
  hidden: boolean
  selectNode?: ViewNode
  changeSelectNode: (node?: ViewNode) => void
}

const Material: FC<IMaterialProps> = ({
  resetMenu,
  hidden,
  selectNode,
  changeSelectNode
}) => {
  const onDragStart = (item: ViewNodeType, e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setDragImage(e.target as Element, 0, 0)
    e.dataTransfer.setData('text/json', JSON.stringify(item))
    e.dataTransfer.effectAllowed = 'copyMove'

    if (selectNode) {
      changeSelectNode()
    }
  }

  return (
    <div
      className={style.material}
      style={{ display: hidden ? 'none' : 'block' }}>
      <List
        grid={{ column: 3 }}
        dataSource={materialMenu}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              draggable={true}
              onDragStart={(event) => onDragStart(item, event)}
              onDragOver={(e) => resetMenu()}>
              <Meta title={item.name} />
            </Card>
            {item.name}
          </List.Item>
        )}
      />
    </div>
  )
}

export default Material
