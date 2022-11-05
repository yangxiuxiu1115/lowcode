import { App, ViewNode } from './concepts'
import { ActionItem } from './concepts/types'
export const RevocationStack: ActionItem[] = []
export const FallbackStack: ActionItem[] = []
export let isRevocate = false

const operation = (operate: ActionItem, app: App) => {
  const { content, action, path, index } = operate
  const node: ViewNode = new Function('app', `return ${path}`)(app) as ViewNode
  switch (action) {
    case 'add':
      node.delete({ path, index })
      return
    case 'delete':
      node.add({ path, content: JSON.parse(content), index })
      return
    case 'update':
      node.update({ path, content: JSON.parse(content) })
      return
  }
}

export const revocation = (app: App) => {
  const operate = RevocationStack.pop()
  if (operate) {
    isRevocate = true
    operation(operate, app)
  }
}

export const fallback = (app: App) => {
  const operate = FallbackStack.pop()
  if (operate) {
    operation(operate, app)
  }
}

export const toggleAction = (value: boolean) => {
  isRevocate = value
}
