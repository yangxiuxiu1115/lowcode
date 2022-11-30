import Koa from 'koa'
import { koaBody } from 'koa-body'
import cors from '@koa/cors'
import useRoutes from './src/routes'

const app = new Koa()

app.use(
  cors({
    origin: '127.0.0.1:5173',
  })
)
app.use(koaBody())
useRoutes(app)

app.listen(8000, () => {
  console.log('后端服务启动成功, 已监听8000端口!')
})
