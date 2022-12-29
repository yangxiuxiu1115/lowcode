import { v4 as uuid4 } from 'uuid'
import { event } from '../event'
import { property } from '../decorator'

import { IProperties } from './types'

export default class BaseNode {
  id: string = uuid4()

  update(payload: any) {
    event.publish('onChange', {
      ...payload,
      action: 'update'
    })
  }

  add(payload: any) {
    event.publish('onChange', {
      ...payload,
      action: 'add'
    })
  }

  delete(payload: any) {
    event.publish('onChange', {
      ...payload,
      action: 'delete'
    })
  }

  protected instansition(propertys: IProperties[]) {
    propertys.forEach((item) => property(this, item.key, item.type))
  }
}
