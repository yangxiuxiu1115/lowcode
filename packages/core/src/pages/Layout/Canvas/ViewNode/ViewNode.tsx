import React, { FC } from 'react'
import * as antd from 'antd'
import { ViewNode } from '@lowcode/concept'

const ViewItem: FC<{ viewNode: ViewNode; path: string }> = ({
  viewNode,
  path
}) => {
  const { typename, parentname, children, text, property, slot } = viewNode

  const Component = parentname
    ? (antd as any)[parentname][typename]
    : (antd as any)[typename]

  return (
    <>
      <Component {...property} style={{ path }}>
        {children.length ? (
          children.map((view, index) => (
            <ViewItem
              viewNode={view as ViewNode}
              key={(view as ViewNode).id}
              path={`${path}.children[${index}]`}></ViewItem>
          ))
        ) : slot ? (
          <div className="emptynode"></div>
        ) : (
          text ?? null
        )}
      </Component>
    </>
  )
}

export default ViewItem
