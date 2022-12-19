import React, { FC, useEffect } from 'react'

import style from './Prompt.module.scss'

const Prompt: FC<{ hoverNode: HTMLElement | null }> = ({ hoverNode }) => {
  useEffect(() => {
    console.log(hoverNode)
  }, [hoverNode])

  return (
    <>
      <div className={style['select-node']}></div>
      <div className={style['hover-node']}></div>
      <div className={style['dragover-prompt']}></div>
    </>
  )
}

export default Prompt
