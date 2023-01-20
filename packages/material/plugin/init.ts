interface IProperty {
  type: 'string' | 'number' | 'select' | 'switch'
  value: number | string | boolean
  label: string
  options?: Array<{ label: string; value: string | number }>
}

interface IConfigOption {
  parentname?: string
  typename: string
  name: string
  isCloseTag: boolean
  property: { [key: string]: any }
  slot: boolean
  text?: string
  childrenName?: string
}
interface SettingConfig {
  parentname?: string
  typename: string
  name: string
  property: { [key: string]: IProperty }
}

const material: IConfigOption[] = []

const init = (config: IConfigOption[] = []) => {
  material.push(...config)
}

export { init, material }
export type { IConfigOption, SettingConfig, IProperty }
