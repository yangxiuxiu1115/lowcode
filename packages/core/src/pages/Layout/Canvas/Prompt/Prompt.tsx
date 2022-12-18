import React from 'react'

import style from './Prompt.module.scss'

const Prompt = () => {
  return (
    <>
      <div className={style['select-node']}></div>
      <div className={style['hover-node']}></div>
      <div className={style['dragover-prompt']}></div>
    </>
  )
}

export default Prompt
