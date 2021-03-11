const Koa = require('koa')
const app = new Koa()

const router = require('./router/index')

app.use(async (ctx, next) => {
  console.log(`调用了${ctx.method}，接口为${ctx.path}`);
  await next()
})

app.use(router.routes())

app.listen(3000, () => {
  console.log("监听3000端口成功，http://localhost:3000");
})