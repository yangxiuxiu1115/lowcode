export * from './concepts/index'
import { event } from './event'
import { ActionItem } from './concepts/types'
import {
  isRevocate,
  RevocationStack,
  FallbackStack,
  toggleAction,
} from './operation'
export * from './decorator/index'
export * from './operation'

event.subscribe('onChange', (payload: ActionItem) => {
  if (isRevocate) {
    FallbackStack.push(payload)
    toggleAction(false)
  } else {
    RevocationStack.push(payload)
  }
})

export { event }
