const { saveLoginLog } = require('../../methods');
const Admin = require('../../models/Admin');
const { errorMsg, successData } = require('../../utils/message');
const router = require('koa-router')()

router.post('/login', async ctx => {
  const { username, password } = ctx.request.body

  if (!username) {
    return ctx.body = errorMsg('用户名不能为空！')
  }
  if (!password) {
    return ctx.body = errorMsg('密码不能为空！')
  }

  const hasOne = await Admin.findOne({
    where: {
      account: username
    }
  })

  if (hasOne && password === hasOne.password) {
    /* saveLoginLog(ctx) */
    return ctx.body = successData({
      message: '登陆成功！'
    })
  } else {
    return ctx.body = errorMsg('账号或密码不正确！')
  }
})

module.exports = router;