import View from './View'
import ViewNode from './ViewNode'

export enum Concept {
  ViewNode = 'ViewNode',
  Animate = 'Animate'
}

export interface ActionType {
  action: 'update' | 'add' | 'delete'
}

export interface ActionChange {
  path?: string
  content?: any
  index?: number
}
export type ActionItem = ActionType & ActionChange
export interface ViewNodeType {
  typename: string
  name: string
  property?: { [key: string]: number | string }
  slot: boolean
  text?: string
  children?: Array<ViewNodeType | ViewNode>
  parentname?: string
}

export interface AppType {
  view: ViewType
  name: string
}

export interface ViewType {
  children?: Array<View | ViewType>
  render?: Array<ViewNodeType | ViewNode>
  states?: any[]
  name: string
}

export type PropertyType = 'ViewNode' | 'View'
export interface IProperties {
  key: string
  type: PropertyType
}
