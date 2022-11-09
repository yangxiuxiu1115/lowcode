import ViewNode from './ViewNode'

export enum Concept {
  ViewNode = 'ViewNode',
  Animate = 'Animate',
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
  children?: (ViewNodeType | ViewNode)[]
  parentname?: string
}

export interface AppType {
  views?: (ViewNodeType | ViewNode)[]
  name: string
}
