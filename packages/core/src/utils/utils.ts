import { App, ViewNode } from '@lowcode/concept'

export const isViewNode = (node: HTMLElement): boolean => {
  const path = node.getAttribute('lowcode-path')
  const name = node.getAttribute('lowcode-name')
  if (path && name) {
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

export const GetViewNodePath = (node: ViewNode | App): ViewNode[] => {
  const viewNodePath: ViewNode[] = []
  while (node instanceof ViewNode) {
    viewNodePath.push(node)
    node = node.parent!
  }

  return viewNodePath
}
