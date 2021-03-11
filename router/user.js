const router = require('koa-router')()

router.get('/user/list', async ctx => {
  ctx.body = '用户列表'
})
