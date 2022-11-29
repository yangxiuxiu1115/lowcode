import fs from 'fs'
import path from 'path'
import KoaRouter from '@koa/router'

const material = new KoaRouter({
  prefix: '/material',
})

material.get('/', async (ctx, next) => {
  const materials = await fs.promises.readFile(
    path.resolve(__dirname, '../../materials/baseMaterial.json'),
    {
      encoding: 'utf-8',
    }
  )
  ctx.body = {
    code: 'success',
    data: {
      list: materials,
    },
  }
})

export default material
