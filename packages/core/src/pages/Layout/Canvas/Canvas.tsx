import React from 'react'
import { App } from '@lowcode/concept'
import type { ViewNode } from '@lowcode/concept'

import style from './canvas.module.scss'
import ViewItem from './ViewNode/ViewNode'

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
          type: 'primary',
        },
      },
    ],
  })
  return (
    <div className={style.canvas}>
      <div className="app">
        {app.views.map((view) => (
          <ViewItem
            viewNode={view as ViewNode}
            key={(view as ViewNode).id}
          ></ViewItem>
        ))}
      </div>
    </div>
  )
}

export default Canvas
