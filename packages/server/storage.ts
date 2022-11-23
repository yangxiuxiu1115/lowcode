import KoaRouter from '@koa/router'

const router = new KoaRouter({
  prefix: 'storage',
})

router.post('/', (req, res) => {})

export default router
