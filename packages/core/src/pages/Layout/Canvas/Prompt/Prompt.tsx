import { ViewNode } from '@lowcode/concept'
import React, { FC, useEffect, useRef, MouseEventHandler } from 'react'

import style from './Prompt.module.scss'

let lastEmpty: HTMLDivElement | null = null

const Prompt: FC<{ hoverViewNode?: ViewNode; dragOverNode?: ViewNode }> = ({
  hoverViewNode,
  dragOverNode
}) => {
  const hoverNodeRef = useRef<HTMLDivElement>(null)
  const dragHoverNodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hoverNodeRef.current) {
      if (hoverViewNode) {
        const hoverRect = hoverViewNode.getRect()!
        hoverNodeRef.current.style.top = `${hoverRect.top}px`
        hoverNodeRef.current.style.left = `${hoverRect.left}px`
        hoverNodeRef.current.style.width = `${hoverRect.width}px`
        hoverNodeRef.current.style.height = `${hoverRect.height}px`
        hoverNodeRef.current.style.display = 'block'
      } else {
        hoverNodeRef.current.style.display = 'none'
      }
    }
  }, [hoverViewNode])

  useEffect(() => {
    if (lastEmpty) lastEmpty.style.backgroundColor = 'gainsboro'

    if (dragHoverNodeRef.current) {
      if (dragOverNode) {
        if (dragOverNode.slot && !dragOverNode.children.length) {
          dragHoverNodeRef.current.style.display = 'none'
          const empty = dragOverNode.getElement()?.children[0] as HTMLDivElement
          empty.style.backgroundColor = 'aqua'
          lastEmpty = empty
          return
        }

        const hoverRect = dragOverNode.getRect()!
        dragHoverNodeRef.current.style.top = `${
          hoverRect.top + hoverRect.height
        }px`
        dragHoverNodeRef.current.style.left = `${hoverRect.left}px`
        dragHoverNodeRef.current.style.width = `${hoverRect.width}px`
        dragHoverNodeRef.current.style.height = '2px'
        dragHoverNodeRef.current.style.display = 'block'
      } else {
        dragHoverNodeRef.current.style.display = 'none'
      }
    }
  }, [dragOverNode])

  // const onMouseOver = (state?: ViewNode) => {
  //   const handle: MouseEventHandler<HTMLDivElement> = (e) => {
  //     console.log(e)
  //   }
  //   return handle
  // }

  return (
    <>
      <div
        className={style['select-node']}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}></div>
      <div
        className={style['hover-node']}
        ref={hoverNodeRef}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        // onMouseMove={onMouseOver(hoverViewNode)}
      ></div>
      <div
        className={style['dragover-prompt']}
        ref={dragHoverNodeRef}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}></div>
    </>
  )
}

export default Prompt
