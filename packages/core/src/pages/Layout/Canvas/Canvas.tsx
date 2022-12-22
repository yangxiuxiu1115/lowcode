import React, {
  DragEventHandler,
  FC,
  MouseEventHandler,
  useEffect,
  useState
} from 'react'
import { App } from '@lowcode/concept'
import type { ViewNode } from '@lowcode/concept'

import style from './canvas.module.scss'
import ViewItem from './ViewNode/ViewNode'
import Prompt from './Prompt/Prompt'
import { hoverEffct } from '@/utils/utils'

const Canvas: FC<{ handleSelect: (node: ViewNode) => void }> = ({
  handleSelect
}) => {
  const [app, setApp] = useState<App>(new App({ name: 'app' }))

  const [hoverViewNode, setHoverViewNode] = useState<ViewNode>()
  const [dragOverNode, setDragOverNode] = useState<ViewNode>()

  useEffect(() => {
    setApp(
      new App({
        name: 'app',
        views: [
          {
            name: '行布局',
            typename: 'Row',
            slot: true,
            property: {
              gutter: 20
            },
            children: [
              {
                name: '列布局',
                typename: 'Col',
                slot: true,
                property: {
                  span: 6
                }
              },
              {
                name: '列布局',
                typename: 'Col',
                slot: true,
                property: {
                  span: 6
                }
              },
              {
                name: '列布局',
                typename: 'Col',
                slot: true,
                property: {
                  span: 6
                }
              },
              {
                name: '列布局',
                typename: 'Col',
                slot: true,
                property: {
                  span: 6
                }
              }
            ]
          },
          {
            name: '自动完成',
            typename: 'AutoComplete',
            slot: false,
            property: {
              placeholder: '请选择'
            }
          }
        ]
      })
    )
  }, [])

  const onMouseOver: MouseEventHandler<HTMLDivElement> = (e) => {
    hoverEffct(e, app, hoverViewNode, setHoverViewNode)
  }

  const onDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()

    hoverEffct(e, app, dragOverNode, setDragOverNode)
  }

  const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
    const viewnode = JSON.parse(e.dataTransfer.getData('text/json'))
    const path = dragOverNode?.getElement()?.getAttribute('lowcode-path')
    dragOverNode?.add({
      content: viewnode,
      path: path!
    })
    setDragOverNode(undefined)
  }

  return (
    <div className={style.canvas}>
      <div
        className="app"
        onDragOver={onDragOver}
        onMouseOver={onMouseOver}
        onDrop={onDrop}
        onDragEnter={(e) => e.preventDefault()}>
        {app?.views.map((view, index) => (
          <ViewItem
            viewNode={view as ViewNode}
            key={(view as ViewNode).id}
            path={`app.views[${index}]`}></ViewItem>
        ))}
      </div>
      <Prompt
        hoverViewNode={hoverViewNode}
        dragOverNode={dragOverNode}></Prompt>
    </div>
  )
}

export default Canvas
