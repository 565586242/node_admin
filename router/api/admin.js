const router = require('koa-router')()
const Admin = require('../../models/Admin');
const { Sequelize } = require('../../utils/db');
const { errorMsg, successMsg, successData } = require('../../utils/message')
const Op = Sequelize.Op

router.get('/list', async ctx => {
  const { page = 1, size = 10 } = ctx. request.body
  const { count, rows } = await Admin.findAndCountAll({
    offset: (page - 1) * size,
    limit: size
  })
  ctx.body = successData({
    data: rows,
    totalCount: count
  })
})

router.post('/save', async ctx => {
  const {
    account,
    email,
    rootId,
    password,
    remark,
  } = ctx.request.body
  if (!account) {
    return ctx.body = errorMsg('账户不能为空！')
  }
  if (!rootId) {
    return ctx.body = errorMsg('部门不能为空！')
  }
  if (!password) {
    return ctx.body = errorMsg('登陆密码不能为空！')
  }

  const hasOne = await Admin.findOne({ where: { account }})
  if (hasOne) {
    return ctx.body = errorMsg('账户已存在！')
  }

  const res = await Admin.create({
    account,
    email,
    rootId,
    password,
    remark
  })
  if (res) {
    return ctx.body = successMsg('保存成功！')
  }
})

router.post('/update', async ctx => {
  const {
    id,
    account,
    email,
    rootId,
    password,
    remark,
  } = ctx.request.body
  if (!id) {
    return ctx.body = errorMsg('无管理员id')
  }
  if (!account) {
    return ctx.body = errorMsg('账户不能为空！')
  }
  if (!rootId) {
    return ctx.body = errorMsg('部门不能为空！')
  }
  if (!password) {
    return ctx.body = errorMsg('登陆密码不能为空！')
  }

  const hasOne = await Admin.findOne({
    where: {
      account,
      id: {
        [Op.ne]: id
      }
    }
  })
  if (hasOne) {
    return ctx.body = errorMsg('账户名称已存在！')
  }

  const res = await Admin.update({
    account,
    email,
    rootId,
    password,
    remark
  }, {
    where: {
      id
    }
  })
  if (res) {
    return ctx.body = successMsg('修改成功！')
  }
})

router.post('/del', async ctx => {
  const { ids } = ctx.request.body
  await Admin.destroy({
    where: {
      id: {
        [Op.in]: ids.split(',')
      }
    }
  })
  return ctx.body = successMsg('删除成功')
})


module.exports = router