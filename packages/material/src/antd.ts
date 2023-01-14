import type { IConfigOption, SettingConfig } from '../plugin/init'

const antdAssets = (await import('../assets/assets.json')) as unknown as {
  default: IConfigOption[]
}
const antdSetting = (await import('../assets/setting.json')) as unknown as {
  default: SettingConfig[]
}

export { antdAssets, antdSetting }
