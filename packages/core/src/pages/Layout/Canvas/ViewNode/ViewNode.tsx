import React, { FC, useEffect, useRef } from 'react'
import * as antd from 'antd'
import { ViewNode } from '@lowcode/concept'

const ViewItem: FC<{ viewNode: ViewNode; path: string }> = ({
  viewNode,
  path
}) => {
  const { typename, parentname, children, text, property, slot } = viewNode

  const componentRef = useRef<HTMLElement>()
  const Component = parentname
    ? (antd as any)[parentname][typename]
    : (antd as any)[typename]

  useEffect(() => {
    console.log(Component)
    if (componentRef.current instanceof HTMLElement) {
      componentRef.current.setAttribute('lowcode-path', path)
      viewNode.setElement(componentRef.current)
    }
  }, [path])

  useEffect(() => {
    if (componentRef.current instanceof HTMLElement) {
      viewNode.setRect(componentRef.current.getBoundingClientRect())
    }
  }, [children.length])

  return (
    <Component
      {...property}
      ref={componentRef}>
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
        text
      )}
    </Component>
  )
}

export default ViewItem
