import { event } from './event'
import { ActionItem } from './concepts/types'

const queue: ActionItem[] = []
const p = Promise.resolve()
let isFlushPending = false

event.subscribe('storage', (payload: ActionItem) => {
  queueJobs(payload)
})

export function nextTick(fn: () => void) {
  return p.then(fn)
}

export function queueJobs(job: ActionItem) {
  if (!queue.includes(job)) {
    queue.push(job)

    queueFlush()
  }
}

export function queueFlush() {
  if (isFlushPending) return

  isFlushPending = true
  nextTick(flushJobs)
}

export function flushJobs() {
  isFlushPending = false
  console.log(queue)
}
