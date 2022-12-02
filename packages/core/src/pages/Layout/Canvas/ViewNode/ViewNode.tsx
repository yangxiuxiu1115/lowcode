import React, { FC } from 'react'
import * as antd from 'antd'
import { ViewNode } from '@lowcode/concept'

const ViewItem: FC<{ viewNode: ViewNode }> = ({ viewNode }) => {
  const { typename, parentname, children, text, property } = viewNode
  const Component = parentname
    ? (antd as any)[parentname][typename]
    : (antd as any)[typename]
  return (
    <Component {...property}>
      {children &&
        children.map((view) => (
          <ViewItem
            viewNode={view as ViewNode}
            key={(view as ViewNode).id}
          ></ViewItem>
        ))}
      {text}
    </Component>
  )
}
export default ViewItem
