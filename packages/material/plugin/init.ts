interface IProperty {
  type: 'string' | 'number' | 'select'
  value: number | string
  label: string
}

interface IConfigOption {
  parentname?: string
  typename: string
  name: string
  isCloseTag: boolean
  property: { [key: string]: IProperty }
  slot: boolean
  text?: string
  childrenName?: string
}
let material: IConfigOption[]

const init = (config: IConfigOption[] = []) => {
  if (material) {
    material = material.concat(config)
  } else {
    material = config
  }
}

export { init, material }
export type { IConfigOption }
