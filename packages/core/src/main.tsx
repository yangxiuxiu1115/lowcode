import React from 'react'
import ReactDOM from 'react-dom/client'
import { init, antd } from '@lowcode/material'

import Root from './App'
import 'animate.css'
import './index.css'

init(antd.default)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />
)
