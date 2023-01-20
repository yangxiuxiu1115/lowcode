export interface BindItemType<T> {
  value: T
  label: string
}
interface NumberInput extends BindItemType<number> {
  type: 'number'
}

interface StringInput extends BindItemType<string> {
  type: 'string'
}

interface SelectInput extends BindItemType<string> {
  type: 'select'
  options: Array<{ label: string; value: string }>
}

interface SwitchInput extends BindItemType<boolean> {
  type: 'switch'
}

interface MultipleInput extends BindItemType<string[]> {
  type: 'multiple'
  options: Array<{ label: string; value: string }>
}
export interface BindType {
  placeholder?: StringInput
  gutter?: NumberInput
  span?: NumberInput
  offset?: NumberInput
  order?: NumberInput
  pull?: NumberInput
  push?: NumberInput
  type?: SelectInput
  size?: SelectInput
  activeText?: StringInput
  inactiveText?: StringInput
  disabled?: SwitchInput
  clearable?: SwitchInput
  danger?: SwitchInput
  shape?: SelectInput
  block?: SwitchInput
  dashed?: SwitchInput
  orientation?: SelectInput
  plain?: SwitchInput
  align?: SelectInput
  justify?: SelectInput
  wrap?: SwitchInput
  direction?: SelectInput
  arrow?: SwitchInput
  autoFocus?: SwitchInput
  destroyPopupOnHide?: SwitchInput
  placement?: SelectInput
  trigger?: MultipleInput
  loading?: SwitchInput
}

export interface MaterialType {
  typename: string
  name: string
  property: BindType
  slot: boolean
  text?: string
  children?: MaterialType[]
  parentname?: string
}
