import { event } from './event'
import { ActionItem } from './concepts/types'

const queue: ActionItem[] = []
const p = Promise.resolve()
let isFlushPending = false

event.subscribe('storage', (payload: ActionItem) => {
  queueJobs(payload).catch((res) => {
    console.log(res)
  })
})

export async function nextTick(fn: () => void) {
  return await p.then(fn)
}

export async function queueJobs(job: ActionItem) {
  if (!queue.includes(job)) {
    queue.push(job)

    await queueFlush()
  }
}

export async function queueFlush() {
  if (isFlushPending) return

  isFlushPending = true
  await nextTick(flushJobs)
}

export function flushJobs() {
  isFlushPending = false
  console.log(queue)
}
