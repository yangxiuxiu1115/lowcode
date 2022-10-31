export * from './concepts/index'
import { event } from './event'
import { ActionItem } from './concepts/types'
import {
  isRevocateOrFallback,
  RevocationStack,
  FallbackStack,
  toggleAction,
} from './operation'
export * from './decorator/index'
export * from './operation'

event.subscribe('onChange', (payload: ActionItem) => {
  if (isRevocateOrFallback) {
    FallbackStack.push(payload)
    toggleAction(false)
  } else {
    RevocationStack.push(payload)
  }
})

export { event }
