const GetViewNode = (node: HTMLElement): HTMLElement | null => {
  const path = node.getAttribute('path')
  if (path) {
    return node
  }
  return node.parentElement && GetViewNode(node.parentElement)
}

export { GetViewNode }
