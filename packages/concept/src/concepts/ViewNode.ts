import BaseNode from './BaseNode'
import App from './App'
import { BindType, ActionChange, ViewNodeType } from './types'

const properties = ['children']
export default class ViewNode extends BaseNode {
  type = 'ViewNode'
  property: BindType
  typename: string
  name: string
  slot: boolean
  text?: string
  parent?: ViewNode | App
  parentname?: string
  private _el: HTMLElement | null = null

  children: (ViewNode | ViewNodeType)[]

  constructor({
    property,
    slot,
    text,
    children = [],
    name,
    parentname,
    typename,
  }: ViewNodeType) {
    super()
    super.instansition(properties)

    this.name = name
    this.typename = typename
    this.property = property
    this.slot = slot
    this.text = text
    this.children = children
    this.parentname = parentname
  }

  update({ path, content }: ActionChange): void {
    Object.keys(content).forEach((key) => {
      ;(this.property[key as keyof BindType] as any).value = content[key]
    })
    super.update({
      path,
      content: JSON.stringify(this.property),
    })
  }

  delete(actionChange: ActionChange) {
    const { path, index } = actionChange
    if (index) {
      super.delete({
        path,
        content: (this.children[index] as ViewNode).toJSON(),
        index,
      })
      this.children.splice(index, 1)
    } else {
      const deleteNode = this.children.pop() as ViewNode
      deleteNode &&
        super.delete({
          path,
          content: deleteNode.toJSON(),
        })
    }
  }

  add(actionChange: ActionChange) {
    const { content, path, index } = actionChange
    if (index) {
      this.children.splice(index, 0, content)
    } else {
      this.children.push(content)
    }
    super.add({
      path,
      content: JSON.stringify(content),
      index,
    })
  }

  toJSON(): string {
    return JSON.stringify({
      type: this.type,
      property: this.property,
      children: this.children?.map((viewNode: any) => viewNode.toJSON()),
      name: this.name,
      parentname: this.parentname,
    })
  }

  setParent(parent: App | ViewNode) {
    this.parent = parent
  }

  getElement() {
    return this._el
  }

  setElement(el: HTMLElement) {
    this._el = el
  }
}