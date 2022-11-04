import React from 'react'
import * as antd from 'antd'

import style from './canvas.module.scss'

const Canvas = () => {
  return (
    <div className={style.canvas}>
      <div className="app">
        {React.createElement(
          antd['Button'],
          {
            type: 'primary',
          },
          123
        )}
      </div>
    </div>
  )
}

export default Canvas
