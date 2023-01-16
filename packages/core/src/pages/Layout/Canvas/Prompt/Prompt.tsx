import React, {
  FC,
  useEffect,
  useRef,
  MouseEventHandler,
  useState,
  EventHandler
} from 'react'
import { Dropdown } from 'antd'
import { ViewNode } from '@lowcode/concept'

import Portal from '@/components/Portal/Portal'
import { GetViewNodePath, setStyle } from '@/utils/index'
import style from './Prompt.module.scss'

let lastEmpty: HTMLDivElement | null = null

type ChangeNodeFunc = (el?: ViewNode) => void

const MoveHandle: <T extends EventHandler<any>>(
  changeState: ChangeNodeFunc,
  state?: ViewNode,
  preventDefault?: boolean,
  effect?: (e: Event) => void
) => T = (changeState, state, preventDefault = false, effect) => {
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

interface ISelectPromptProps {
  selectNode?: ViewNode
  changeSelectNode: (node?: ViewNode) => void
  changeHoverNode: (node?: ViewNode) => void
}
const SelectPrompt: FC<ISelectPromptProps> = ({
  selectNode,
  changeSelectNode,
  changeHoverNode
}) => {
  const [nodePath, setNodePath] = useState<ViewNode[]>([])
  const selectNodeRef = useRef<HTMLDivElement>(null)
  const nodePathRef = useRef<HTMLSpanElement>(null)

  const selectNodeMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (selectNode) {
      changeHoverNode(selectNode)
    }
  }

  const dropdownItemClick = ({ key }: { key: string }) => {
    const selectNode = nodePath.find((node) => node.id === key)
    if (selectNode) {
      changeSelectNode(selectNode)
    }
  }

  useEffect(() => {
    const el = selectNodeRef.current
    const nodePathEl = nodePathRef.current
    if (el && nodePathEl) {
      if (selectNode) {
        const { width, height, left, top } = selectNode.getRect()!

        setStyle(el, {
          transform: `translate(${left}px, ${top}px)`,
          width: `${width - 2}px`,
          height: `${height - 2}px`,
          display: 'block'
        })
        setStyle(nodePathEl, {
          transform: `translate(${left}px, ${top - 16}px)`,
          display: 'block'
        })

        const path = GetViewNodePath(selectNode.parent!)
        setNodePath(path)
      } else {
        setStyle(el, { display: 'none' })
        setStyle(nodePathEl, { display: 'none' })

        setNodePath([])
      }
    }
  }, [selectNode])
  return (
    <div
      className={style['select-node']}
      ref={selectNodeRef}
      onMouseMove={selectNodeMouseMove}>
      <Portal to="#root">
        <Dropdown
          menu={{
            items: nodePath.length
              ? nodePath.map((node) => ({
                  key: node.id,
                  label: node.name
                }))
              : [{ key: 'empty', label: '不存在父节点' }],
            onClick: dropdownItemClick
          }}
          overlayClassName="dropdownList">
          <span className={style['node-path']} ref={nodePathRef}>
            {selectNode?.name}
          </span>
        </Dropdown>
      </Portal>
    </div>
  )
}

interface IPromptProps {
  hoverNode?: ViewNode
  dragOverNode?: ViewNode
  selectNode?: ViewNode
  changeHoverNode: ChangeNodeFunc
  changeSelectNode: ChangeNodeFunc
}
const Prompt: FC<IPromptProps> = ({
  hoverNode,
  dragOverNode,
  selectNode,
  changeHoverNode,
  changeSelectNode
}) => {
  const hoverNodeRef = useRef<HTMLDivElement>(null)
  const dragOverNodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = hoverNodeRef.current
    if (el) {
      if (hoverNode) {
        const { width, height, left, top } = hoverNode.getRect()!

        setStyle(el, {
          transform: `translate(${left}px, ${top}px)`,
          width: `${width - 4}px`,
          height: `${height - 4}px`,
          display: 'block'
        })
      } else {
        setStyle(el, { display: 'none' })
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
          const dragOverNodeEl = dragOverNode.getElement()!
          const empty = (dragOverNodeEl.children[0] ||
            dragOverNodeEl) as HTMLDivElement
          empty.style.backgroundColor = 'aqua'
          lastEmpty = empty
          return
        }

        const hoverRect = dragOverNode.getRect()!

        setStyle(el, {
          top: `${hoverRect.top + hoverRect.height}px`,
          left: `${hoverRect.left}px`,
          width: `${hoverRect.width}px`,
          height: '2px',
          display: 'block'
        })
      } else {
        setStyle(el, { display: 'none' })
      }
    }
  }, [dragOverNode])

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (hoverNode) {
      changeSelectNode(hoverNode)
    }
  }

  return (
    <Portal to="#root">
      <SelectPrompt
        selectNode={selectNode}
        changeSelectNode={changeSelectNode}
        changeHoverNode={changeHoverNode}
      />
      <div
        className={style['hover-node']}
        ref={hoverNodeRef}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onMouseMove={MoveHandle<MouseEventHandler<HTMLDivElement>>(
          changeHoverNode,
          hoverNode
        )}
        onClick={onClick}></div>
      <div
        className={style['dragover-prompt']}
        ref={dragOverNodeRef}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}></div>
    </Portal>
  )
}

export default Prompt
