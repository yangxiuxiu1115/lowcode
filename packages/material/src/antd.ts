import { IConfigOption } from '../plugin/init'

const antd = (await import('../assets/assets.json')) as unknown as {
  default: IConfigOption[]
}

export { antd }
