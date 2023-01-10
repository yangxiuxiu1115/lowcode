import Koa from 'koa'
import { koaBody } from 'koa-body'
import cors from '@koa/cors'
import useRoutes from './src/routes'

const app = new Koa()

app.use(
  cors({
    origin: 'http://localhost:5173'
  })
)
app.use(koaBody())
useRoutes(app).catch((err) => {
  console.log(err)
})

app.listen(8000, () => {
  console.log('后端服务启动成功, 已监听8000端口!')
})
