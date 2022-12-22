import { App, ViewNode } from '@lowcode/concept'
import { Dispatch, SetStateAction } from 'react'

export const isViewNode = (node: any): boolean => {
  const path = node.style.path
  if (path) {
    return true
  }
  return false
}

export const isEmptyNode = (node: HTMLElement): boolean => {
  const isEmpty = node.classList.contains('emptynode')

  return isEmpty
}

export const GetViewNodeJson = (app: App, path: string): ViewNode => {
  return new Function('app', `return ${path}`)(app)
}

export const GetViewNode = (node: HTMLElement): HTMLElement | null => {
  if (isViewNode(node)) {
    return node
  }
  return node.parentElement && GetViewNode(node.parentElement)
}

export const GetValidViewNode = (node: HTMLElement): HTMLElement | null => {
  if (isViewNode(node) || isEmptyNode(node)) {
    return node
  }

  return node.parentElement && GetValidViewNode(node.parentElement)
}

export const GetViewNodePath = (node: HTMLElement | null): HTMLElement[] => {
  const viewNodePath: HTMLElement[] = []
  while (node) {
    if (isViewNode(node)) {
      viewNodePath.unshift(node)
    }
    node = node.parentElement
  }

  return viewNodePath
}

export const hoverEffct = (
  e: any,
  app: App,
  state: ViewNode | undefined,
  stateAction: Dispatch<SetStateAction<ViewNode | undefined>>
) => {
  const targetNode = GetViewNode(e.target)
  if (!targetNode) {
    stateAction(undefined)
    return
  }
  const path = (targetNode.style as any).path
  const hoverNodeJson = GetViewNodeJson(app, path)
  if (!hoverNodeJson.getElement()) {
    // SetElementContainsChild(hoverNodeJson, targetNode)
    hoverNodeJson.setElement(targetNode)
  }
  hoverNodeJson.setRect(targetNode.getBoundingClientRect())
  if (hoverNodeJson.id !== state?.id) {
    stateAction(hoverNodeJson)
  }
}
