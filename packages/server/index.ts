import Koa from 'koa'
import { koaBody } from 'koa-body'
import storage from './storage'

const app = new Koa()

app.use(koaBody())
app.use(storage.routes())
app.use(storage.allowedMethods())

app.listen(8000, () => {
  console.log('后端服务启动成功, 已监听8000端口!')
})
