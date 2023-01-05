import BaseNode from './BaseNode'
import View from './View'
import type { ActionChange, ViewNodeType, IProperties } from './types'

const properties: IProperties[] = [{ key: 'children', type: 'ViewNode' }]
export default class ViewNode extends BaseNode {
  type = 'ViewNode'
  property: { [key: string]: number | string } = {}
  typename: string
  name: string
  slot: boolean
  isCloseTag: boolean
  text?: string
  parent?: ViewNode | View
  parentname?: string

  private location: DOMRect | null = null
  private _el: HTMLElement | null = null

  children: Array<ViewNode | ViewNodeType>

  constructor({
    slot,
    text,
    children = [],
    name,
    parentname,
    typename,
    property = {},
    isCloseTag
  }: ViewNodeType) {
    super()
    super.instansition(properties)

    this.name = name
    this.typename = typename
    this.slot = slot
    this.text = text
    this.children = children
    this.parentname = parentname
    this.property = property
    this.isCloseTag = isCloseTag
  }

  update({ path, content }: ActionChange): void {
    Object.keys(content).forEach((key) => {
      this.property[key] = content[key].value
    })
    super.update({
      path,
      content: JSON.stringify(this.property)
    })
  }

  delete(actionChange: ActionChange) {
    const { path, index } = actionChange
    if (index) {
      const deleteNode = this.children[index] as ViewNode
      this.children.splice(index, 1)
      super.delete({
        path,
        content: deleteNode.toJSON(),
        index
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
      index: index ? index : this.children.length - 1
    })
  }

  toJSON(): string {
    return JSON.stringify({
      property: this.property,
      children: this.children?.map((viewNode: any) => viewNode.toJSON()),
      name: this.name,
      parentname: this.parentname,
      slot: this.slot,
      text: this.text,
      typename: this.typename
    })
  }

  setParent(parent: View | ViewNode) {
    this.parent = parent
  }

  getElement() {
    return this._el
  }

  setElement(el: HTMLElement) {
    this._el = el
  }

  getRect() {
    return this.location
  }

  setRect(rect: DOMRect) {
    this.location = rect
  }
}
