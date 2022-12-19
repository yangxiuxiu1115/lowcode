import React, { DragEventHandler, useRef, useState } from 'react'
import { App } from '@lowcode/concept'
import type { ViewNode } from '@lowcode/concept'

import style from './canvas.module.scss'
import ViewItem from './ViewNode/ViewNode'
import Prompt from './Prompt/Prompt'
import { GetViewNode, GetViewNodePath } from '@/utils/utils'

const Canvas = () => {
  const app = new App({
    name: 'app',
    views: [
      {
        name: '按钮',
        typename: 'Button',
        slot: false,
        text: '按钮',
        property: {
          type: 'primary'
        }
      }
    ]
  })

  const [hoverNode, setHoverNode] = useState<HTMLElement | null>(null)

  const onDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    const targetNode = GetViewNode(e.target as HTMLElement)
    setHoverNode(targetNode)

    const validNodePath = GetViewNodePath(e.target as HTMLElement)
  }

  const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
    const viewnode = JSON.parse(e.dataTransfer.getData('text/json'))
    console.log(viewnode)
  }

  return (
    <div className={style.canvas}>
      <div
        className="app"
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnter={(e) => e.preventDefault()}>
        {app.views.map((view, index) => (
          <ViewItem
            viewNode={view as ViewNode}
            key={(view as ViewNode).id}
            path={`app[${index}]`}></ViewItem>
        ))}
      </div>
      <Prompt hoverNode={hoverNode}></Prompt>
    </div>
  )
}

export default Canvas
