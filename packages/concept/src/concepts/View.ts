import BaseNode from './BaseNode'
import ViewNode from './ViewNode'
import type { ActionChange, ViewNodeType, ViewType, IProperties } from './types'

const properties: IProperties[] = [
  { key: 'children', type: 'View' },
  { key: 'render', type: 'ViewNode' }
]

export default class View extends BaseNode {
  type: 'View' = 'View'
  parent: View | null = null

  name: string
  render: Array<ViewNode | ViewNodeType>
  children: Array<View | ViewType>
  states: any[]

  constructor({ name, children = [], render = [], states = [] }: ViewType) {
    super()
    super.instansition(properties)

    this.name = name
    this.children = children
    this.render = render
    this.states = states
  }

  addView(payload: ActionChange) {
    const { index, content, path } = payload
    if (index) {
      this.children.splice(index, 0, content)
    } else {
      this.children.push(content)
    }
    console.log(path)
  }

  addState<T>(state: T) {
    this.states.push(state)
  }

  deleteView(payload: ActionChange) {
    const { index, path } = payload
    if (index) {
      const deleteView = this.children[index]
      this.children.splice(index, 1)
      console.log(deleteView, path)
    }
  }

  setParent(parent: View) {
    this.parent = parent
  }

  toJSON() {
    return JSON.stringify({
      name: this.name,
      render: this.render.map((viewnode: any) => viewnode.toJSON()),
      children: this.children.map((view: any) => view.toJSON()),
      states: this.states
    })
  }
}
