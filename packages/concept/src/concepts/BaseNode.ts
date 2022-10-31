import { v4 as uuid4 } from 'uuid'
import { event } from '../event'
import { property } from '../decorator'

export default class BaseNode {
  id: string = uuid4()

  constructor() {}

  update(payload: any) {
    event.publish('onChange', {
      ...payload,
      action: 'update',
    })
  }

  add(payload: any) {
    event.publish('onChange', {
      ...payload,
      action: 'add',
    })
  }

  delete(payload: any) {
    event.publish('onChange', {
      ...payload,
      action: 'delete',
    })
  }

  protected instansition(propertys: string[]) {
    propertys.forEach((item) => property(this, item))
  }
}
