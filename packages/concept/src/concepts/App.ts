import BaseNode from './BaseNode'
import ViewNode from './ViewNode'
import { ViewNodeType, ActionChange, AppType } from './types'

const properties = ['views']
export default class App extends BaseNode {
  views: (ViewNode | ViewNodeType)[]

  constructor({ views = [] }: AppType) {
    super()
    super.instansition(properties)

    this.views = views
  }

  add(actionChange: ActionChange) {
    const { index, content } = actionChange
    if (index) {
      this.views.splice(index, 0, content)
    } else {
      this.views.push(content)
    }
    super.add({
      path: 'app',
      content: JSON.stringify(content),
    })
  }

  delete(actionChange: ActionChange) {
    const { index } = actionChange
    const deleteNode = (
      index ? this.views[index] : this.views.pop()
    ) as ViewNode
    if (index) {
      this.views.splice(index, 1)
    }
    super.delete({
      path: 'app',
      content: deleteNode.toJSON(),
    })
  }
}
