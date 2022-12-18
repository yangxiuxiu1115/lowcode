import React, { FC, useEffect, useRef } from 'react'
import * as antd from 'antd'
import { ViewNode } from '@lowcode/concept'

const ViewItem: FC<{ viewNode: ViewNode; path: string }> = ({
  viewNode,
  path,
}) => {
  const { typename, parentname, children, text, property } = viewNode

  const componentRef = useRef<HTMLDivElement>()
  const Component = parentname
    ? (antd as any)[parentname][typename]
    : (antd as any)[typename]

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.setAttribute('path', path)
      viewNode.setElement(componentRef.current)
      viewNode.setRect(componentRef.current.getBoundingClientRect())
    }
  }, [path])

  return (
    <Component {...property} ref={componentRef}>
      {children &&
        children.map((view, index) => (
          <ViewItem
            viewNode={view as ViewNode}
            key={(view as ViewNode).id}
            path={`${path}.children[${index}]`}
          ></ViewItem>
        ))}
      {text}
    </Component>
  )
}
export default ViewItem
