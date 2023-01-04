import React, {
  FC,
  useEffect,
  useRef,
  MouseEventHandler,
  useState,
  DragEventHandler,
  EventHandler
} from 'react'
import { Dropdown } from 'antd'
import { GetViewNodePath } from '@/utils/utils'
import { ViewNode } from '@lowcode/concept'

import style from './Prompt.module.scss'

let lastEmpty: HTMLDivElement | null = null

type ChangeNodeFunc = (el: ViewNode | undefined) => void
interface IProps {
  hoverNode?: ViewNode
  dragOverNode?: ViewNode
  selectNode?: ViewNode
  changeHoverNode: ChangeNodeFunc
  changeDragOverNode: ChangeNodeFunc
  changeSelectNode: ChangeNodeFunc
}

const MoveHandle: <T extends EventHandler<any>>(
  state: ViewNode | undefined,
  changeState: ChangeNodeFunc,
  preventDefault?: boolean,
  effect?: (e: Event) => void
) => T = (state, changeState, preventDefault = false, effect) => {
  const handle: any = (e: any) => {
    if (preventDefault) {
      e.preventDefault()
    }
    const children = state?.children
    if (!children?.length) {
      if (effect) {
        effect(e)
      }
      return
    }
    for (let i = 0; i < children.length; ++i) {
      const child = children[i]
      const { x, width, height, y } = (child as ViewNode).getRect()!
      if (
        e.clientX - x <= width &&
        x <= e.clientX &&
        e.clientY - y <= height &&
        y <= e.clientY
      ) {
        changeState(child as ViewNode)
        return
      }
    }
    if (effect) {
      effect(e)
    }
  }
  return handle
}

const Prompt: FC<IProps> = ({
  hoverNode,
  dragOverNode,
  selectNode,
  changeHoverNode,
  changeDragOverNode,
  changeSelectNode
}) => {
  const [nodePath, setNodePath] = useState<ViewNode[]>([])
  const hoverNodeRef = useRef<HTMLDivElement>(null)
  const dragOverNodeRef = useRef<HTMLDivElement>(null)
  const selectNodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hoverNodeRef.current) {
      if (hoverNode) {
        const hoverRect = hoverNode.getRect()!
        hoverNodeRef.current.style.top = `${hoverRect.top}px`
        hoverNodeRef.current.style.left = `${hoverRect.left}px`
        hoverNodeRef.current.style.width = `${hoverRect.width}px`
        hoverNodeRef.current.style.height = `${hoverRect.height}px`
        hoverNodeRef.current.style.display = 'block'
      } else {
        hoverNodeRef.current.style.display = 'none'
      }
    }
  }, [hoverNode])

  useEffect(() => {
    if (lastEmpty) lastEmpty.style.backgroundColor = 'gainsboro'
    const el = dragOverNodeRef.current
    if (el) {
      if (dragOverNode) {
        if (dragOverNode.slot && !dragOverNode.children.length) {
          el.style.display = 'none'
          const empty = dragOverNode.getElement()?.children[0] as HTMLDivElement
          empty.style.backgroundColor = 'aqua'
          lastEmpty = empty
          return
        }

        const hoverRect = dragOverNode.getRect()!
        el.style.top = `${hoverRect.top + hoverRect.height}px`
        el.style.left = `${hoverRect.left}px`
        el.style.width = `${hoverRect.width}px`
        el.style.height = '2px'
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  }, [dragOverNode])

  useEffect(() => {
    const el = selectNodeRef.current
    if (el) {
      if (selectNode) {
        const { top, width, height, left } = selectNode.getRect()!

        el.style.top = `${top}px`
        el.style.left = `${left}px`
        el.style.width = `${width}px`
        el.style.height = `${height}px`
        el.style.display = 'block'

        const path = GetViewNodePath(selectNode.parent!)
        setNodePath(path)
      } else {
        el.style.display = 'none'

        setNodePath([])
      }
    }
  }, [selectNode])

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (hoverNode) {
      changeSelectNode(hoverNode)
    }
  }

  const selectNodeMouseOver: MouseEventHandler<HTMLDivElement> = (e) => {
    if (selectNode) {
      changeHoverNode(selectNode)
    }
  }

  const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
    const viewnode = JSON.parse(e.dataTransfer.getData('text/json'))
    const path = dragOverNode?.getElement()?.getAttribute('lowcode-path')
    dragOverNode?.add({
      content: viewnode,
      path: path!
    })
    changeDragOverNode(undefined)
    changeSelectNode(dragOverNode?.children.at(-1) as ViewNode)
  }

  const dropdownItemClick = ({ key }: { key: string }) => {
    const selectNode = nodePath.find((node) => node.id === key)
    if (selectNode) {
      changeSelectNode(selectNode)
    }
  }
  return (
    <>
      <div
        className={style['select-node']}
        ref={selectNodeRef}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={MoveHandle<DragEventHandler<HTMLDivElement>>(
          selectNode,
          changeDragOverNode,
          true,
          (e) => {
            changeDragOverNode(selectNode)
          }
        )}
        onMouseOver={selectNodeMouseOver}
        onDrop={onDrop}>
        <Dropdown
          menu={{
            items: nodePath
              .map((node) => ({
                key: node.id,
                label: node.name
              }))
              .concat([{ key: 'empty', label: 'Page' }]),
            onClick: dropdownItemClick
          }}
          overlayClassName="dropdownList">
          <span className="node-path">{selectNode?.name}</span>
        </Dropdown>
      </div>
      <div
        className={style['hover-node']}
        ref={hoverNodeRef}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onMouseMove={MoveHandle<MouseEventHandler<HTMLDivElement>>(
          hoverNode,
          changeHoverNode
        )}
        onClick={onClick}></div>
      <div
        className={style['dragover-prompt']}
        ref={dragOverNodeRef}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}></div>
    </>
  )
}

export default Prompt
