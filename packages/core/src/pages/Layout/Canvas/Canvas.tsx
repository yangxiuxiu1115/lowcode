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
import { GetViewNode, GetViewNodeJson } from '@/utils/utils'

const Canvas: FC<{ handleSelect: (node: ViewNode) => void }> = ({
  handleSelect
}) => {
  const [app, setApp] = useState<App>()
  const [hoverViewNode, setHoverViewNode] = useState<ViewNode>()

  useEffect(() => {
    setApp(
      new App({
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
    )
  }, [])

  const onMouseOver: MouseEventHandler<HTMLDivElement> = (e) => {
    const targetNode = GetViewNode(e.target as HTMLElement)
    const path = targetNode?.getAttribute('lowcode-path')
    if (path) {
      const hoverNodeJson = GetViewNodeJson(app!, path)
      if (hoverNodeJson.id !== hoverViewNode?.id) {
        setHoverViewNode(hoverNodeJson)
      }
    } else {
      setHoverViewNode(undefined)
    }
  }

  const onDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
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
      <Prompt hoverViewNode={hoverViewNode}></Prompt>
    </div>
  )
}

export default Canvas
