import React, {
  DragEventHandler,
  FC,
  MouseEventHandler,
  useEffect,
  useState,
  Dispatch,
  SetStateAction
} from 'react'
import { View } from '@lowcode/concept'
import type { ViewNode } from '@lowcode/concept'

import style from './canvas.module.scss'
import ViewItemV2 from './ViewNode/ViewNodeV2'
import Prompt from './Prompt/Prompt'
import { GetViewNode, GetViewNodeJson } from '@/utils/utils'

const hoverEffct = (
  e: any,
  app: View,
  stateAction: Dispatch<SetStateAction<ViewNode | undefined>>,
  state?: ViewNode
) => {
  const targetNode = GetViewNode(e.target)
  if (!targetNode) {
    stateAction(undefined)
    return
  }
  const path = targetNode.getAttribute('lowcode-path')!
  const hoverNodeJson = GetViewNodeJson(app, path)
  if (hoverNodeJson.id !== state?.id) {
    stateAction(hoverNodeJson)
  }
}

interface IEditor {
  app: View
  hoverNode?: ViewNode
  dragOverNode?: ViewNode
  setHoverNode: Dispatch<SetStateAction<ViewNode | undefined>>
  setDragOverNode: Dispatch<SetStateAction<ViewNode | undefined>>
  changeSelectNode: (node: ViewNode | undefined) => void
}

const Editor: FC<IEditor> = ({
  app,
  hoverNode,
  dragOverNode,
  changeSelectNode,
  setHoverNode,
  setDragOverNode
}) => {
  const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    hoverEffct(e, app, setHoverNode, hoverNode)
  }

  const onDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    hoverEffct(e, app, setDragOverNode, dragOverNode)
  }

  const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
    const viewnode = JSON.parse(e.dataTransfer.getData('text/json'))
    const path = dragOverNode?.getElement()?.getAttribute('lowcode-path')
    dragOverNode?.add({
      content: viewnode,
      path: path!
    })
    changeSelectNode(dragOverNode?.children.at(-1) as ViewNode)
    setDragOverNode(undefined)
  }

  return (
    <div
      className="app"
      onDragOver={onDragOver}
      onMouseMove={onMouseMove}
      onDrop={onDrop}
      onDragEnter={(e) => e.preventDefault()}
      onClick={() => {
        changeSelectNode(undefined)
      }}>
      {app.render?.map((view, index) => (
        <ViewItemV2
          viewNode={view as ViewNode}
          key={(view as ViewNode).id}
          path={`app.render[${index}]`}
          index={index}></ViewItemV2>
      ))}
    </div>
  )
}

const Canvas: FC<{
  changeSelectNode: (node?: ViewNode) => void
  selectNode?: ViewNode
}> = ({ changeSelectNode, selectNode }) => {
  const [app, setApp] = useState<View>(new View({ name: 'view' }))
  const [hoverNode, setHoverNode] = useState<ViewNode>()
  const [dragOverNode, setDragOverNode] = useState<ViewNode>()

  useEffect(() => {
    setApp(
      new View({
        name: 'view',
        render: [
          {
            name: '行布局',
            typename: 'Row',
            slot: true,
            isCloseTag: false,
            property: {
              gutter: 20
            },
            children: [
              {
                name: '列布局',
                typename: 'Col',
                slot: true,
                isCloseTag: false,
                property: {
                  span: 6
                }
              },
              {
                name: '列布局',
                typename: 'Col',
                slot: true,
                isCloseTag: false,
                property: {
                  span: 6
                }
              },
              {
                name: '列布局',
                typename: 'Col',
                slot: true,
                isCloseTag: false,
                property: {
                  span: 6
                }
              },
              {
                name: '列布局',
                typename: 'Col',
                slot: true,
                isCloseTag: false,
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
            isCloseTag: false,
            property: {
              placeholder: '请选择'
            }
          }
        ]
      })
    )
  }, [])

  return (
    <div className={style.canvas}>
      <Editor
        app={app}
        changeSelectNode={changeSelectNode}
        hoverNode={hoverNode}
        setHoverNode={setHoverNode}
        dragOverNode={dragOverNode}
        setDragOverNode={setDragOverNode}
      />
      <Prompt
        hoverNode={hoverNode}
        dragOverNode={dragOverNode}
        selectNode={selectNode}
        changeHoverNode={(viewnode) => {
          setHoverNode(viewnode)
        }}
        changeSelectNode={(viewnode) => {
          changeSelectNode(viewnode)
        }}></Prompt>
    </div>
  )
}

export default Canvas
