import Koa from 'koa'
import { koaBody } from 'koa-body'
import useRoutes from './src/routes'

const app = new Koa()

app.use(koaBody())
useRoutes(app)

app.listen(8000, () => {
  console.log('后端服务启动成功, 已监听8000端口!')
})
