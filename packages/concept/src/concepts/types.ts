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

export interface BindItemType<T> {
  value: T
  label: string
}
export type ActionItem = ActionType & ActionChange

interface NumberInput extends BindItemType<number> {
  type: 'number'
}

interface StringInput extends BindItemType<string> {
  type: 'string'
}

interface SelectInput extends BindItemType<string> {
  type: 'select'
  options: { label: string; value: string }[]
}

interface SwitchInput extends BindItemType<boolean> {
  type: 'switch'
}
export interface BindType {
  placeholder?: StringInput
  gutter?: NumberInput
  span?: NumberInput
  offset?: NumberInput
  type?: SelectInput
  size?: SelectInput
  activeText?: StringInput
  inactiveText?: StringInput
  disabled?: SwitchInput
  clearable?: SwitchInput
}

export interface ViewNodeType {
  property: BindType
  slot: boolean
  text?: string
  children?: any[]
}

export interface AppType {
  views?: (ViewNodeType | ViewNode)[]
}
