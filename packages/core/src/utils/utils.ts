import { App, ViewNode } from '@lowcode/concept'

export const isViewNode = (node: HTMLElement): boolean => {
  const path = node.getAttribute('lowcode-path')
  if (path) {
    return true
  }
  return false
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

export const isEqual = (val1: any, val2: any) => {
  if (!val1 || !val2) return false

  const keys = Object.keys(val1)
  const keys2 = Object.keys(val2)

  if (keys.length !== keys2.length) {
    return false
  }

  for (const key in val1) {
    if (val1[key] !== val2[key]) {
      return false
    }
  }

  return true
}
