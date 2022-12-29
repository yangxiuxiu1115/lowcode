import BaseNode from './BaseNode'
import View from './View'
import type { AppType, ViewType } from './types'

export default class App extends BaseNode {
  name: string
  view: ViewType | View

  constructor({ view, name }: AppType) {
    super()

    this.name = name
    this.view = new View(view)
  }
}
