const Koa = require('koa')
const app = new Koa()

// 解决跨域
const cors = require('koa2-cors')
app.use(cors())

// 添加静态文件目录
const static = require('koa-static')
app.use(static(`${__dirname}/static`))

// 添加post解析
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// 配置连接数据库
require('./utils/db')

app.use(async (ctx, next) => {
  console.log(`调用了${ctx.method}，接口为${ctx.path}`);
  await next()
})

// 配置路由
const router = require('./router')
app.use(router.routes())

app.listen(3000, '0.0.0.0', () => {
  console.log("监听3000端口成功，http://localhost:3000");
})