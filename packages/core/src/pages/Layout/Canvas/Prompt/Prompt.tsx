import { ViewNode } from '@lowcode/concept'
import React, { FC, useEffect, useRef } from 'react'

import style from './Prompt.module.scss'

const Prompt: FC<{ hoverViewNode?: ViewNode }> = ({ hoverViewNode }) => {
  const hoverNodeRef = useRef<HTMLDivElement>(null)

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

  return (
    <>
      <div className={style['select-node']}></div>
      <div className={style['hover-node']} ref={hoverNodeRef}></div>
      <div className={style['dragover-prompt']}></div>
    </>
  )
}

export default Prompt
