export const isViewNode = (node: HTMLElement): boolean => {
  const path = node.getAttribute('lowcode-path')
  if (path) {
    return true
  }
  return false
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
