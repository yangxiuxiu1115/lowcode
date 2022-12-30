import { View, ViewNode } from './concepts'
import { ActionItem } from './concepts/types'
import { event } from './event'
export const RevocationStack: ActionItem[] = []
export const FallbackStack: ActionItem[] = []
export let isRevocate = false

const operation = (operate: ActionItem, app: View) => {
  const { content, action, path, index } = operate
  const node: ViewNode = new Function('app', `return ${path!}`)(app) as ViewNode
  switch (action) {
    case 'add':
      node.delete({ path, index })
      return
    case 'delete':
      node.add({ path, content: JSON.parse(content), index })
      return
    case 'update':
      node.update({ path, content: JSON.parse(content) })
  }
}

event.subscribe('onChange', (payload: ActionItem) => {
  if (isRevocate) {
    FallbackStack.push(payload)
    isRevocate = false
  } else {
    RevocationStack.push(payload)
  }

  event.publish('storage', payload)
})

export const revocation = (app: View) => {
  const operate = RevocationStack.pop()
  if (operate) {
    isRevocate = true
    operation(operate, app)
  }
}

export const fallback = (app: View) => {
  const operate = FallbackStack.pop()
  if (operate) {
    operation(operate, app)
  }
}
