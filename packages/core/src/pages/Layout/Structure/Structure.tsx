import React, { FC } from 'react'
import { Tabs, Tooltip } from 'antd'

import { BarChartOutlined, FileOutlined } from '@ant-design/icons'

import { ViewNode } from '@lowcode/concept'

import style from './Structure.module.scss'

const Structure: FC<{ selectNode?: ViewNode }> = ({ selectNode }) => {
  console.log(style)
  return (
    <div className={style.structure}>
      <Tabs
        tabPosition={'left'}
        type="card"
        items={[
          {
            label: (
              <Tooltip title="页面结构" placement="right">
                <FileOutlined />
              </Tooltip>
            ),
            key: '1'
          },
          {
            key: '2',
            label: (
              <Tooltip title="JSON结构" placement="right">
                <BarChartOutlined />
              </Tooltip>
            )
          }
        ]}></Tabs>
    </div>
  )
}

export default Structure
