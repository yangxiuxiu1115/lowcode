import fs from 'fs'
import path from 'path'

import Koa from 'koa'
import type KoaRouter from 'koa__router'

const useRoutes = async (app: Koa) => {
  const routes = await fs.promises.readdir(path.resolve(__dirname, '../routes'))
  routes.forEach(async (file) => {
    if (file === 'index.ts') {
      return
    }
    const route = await import(path.resolve(__dirname, `${file}`))
    app.use(route.default.routes())
    app.use(route.default.allowedMethods())
  })
}

export default useRoutes
