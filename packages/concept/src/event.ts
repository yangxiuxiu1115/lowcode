type EventFunction = (...params: any[]) => void

class LowCodeEvent {
  events: Map<string, EventFunction[]> = new Map()

  subscribe(event: string, callback: EventFunction) {
    const queue = this.events.get(event)
    if (queue) {
      queue.push(callback)
    } else {
      this.events.set(event, [callback])
    }
  }

  publish(event: string, ...payload: any[]) {
    const queue = this.events.get(event)
    if (queue) {
      queue.forEach((fn) => fn(...payload))
    }
  }

  off(event: string, callback: EventFunction) {
    const queue = this.events.get(event)
    if (queue) {
      this.events.set(
        event,
        queue.filter((item) => item !== callback)
      )
    }
  }
}
export const event = new LowCodeEvent()
