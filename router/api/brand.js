const router = require('koa-router')();
const Brand = require('../../models/Brand')
const { successData, errorMsg, successMsg } = require('../../utils/message')
const { Sequelize } = require('../../utils/db');
const Op = Sequelize.Op

router.get('/list', async ctx => {
  const { page = 1, size = 10 } = ctx.request.body
  const { count, rows } = await Brand.findAndCountAll({
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
    brandName,
    brandFirstLetter = "",
    brandLogo,
    brandPicture,
    brandRemark = "",
    brandAuthProve
  } = ctx.request.body

  if (!brandName) {
    return ctx.body = errorMsg('品牌名称不能为空！')
  }
  if (!brandLogo) {
    return ctx.body = errorMsg('品牌Logo不能为空！')
  }
  if (!brandPicture) {
    return ctx.body = errorMsg('品牌大图不能为空！')
  }
  if (!brandAuthProve) {
    return ctx.body = errorMsg('品牌授权证书不能为空！')
  }

  const hasOne = await Brand.findOne({ where: { brandName } })
  if (hasOne) {
    return ctx.body = errorMsg('品牌已存在！')
  }

  const res = await Brand.create({
    brandName,
    brandFirstLetter,
    brandLogo,
    brandPicture,
    brandRemark,
    brandAuthProve
  })
  if (res) {
    return ctx.body = successMsg('保存成功！')
  }
})

router.post('/update', async ctx => {
  const {
    id,
    brandName,
    brandFirstLetter = "",
    brandLogo,
    brandPicture,
    brandRemark = "",
    brandAuthProve
  } = ctx.request.body
  if (!id) {
    return ctx.body = errorMsg('无品牌id')
  }
  if (!brandName) {
    return ctx.body = errorMsg('品牌名称不能为空！')
  }
  if (!brandLogo) {
    return ctx.body = errorMsg('品牌Logo不能为空！')
  }
  if (!brandPicture) {
    return ctx.body = errorMsg('品牌大图不能为空！')
  }
  if (!brandAuthProve) {
    return ctx.body = errorMsg('品牌授权证书不能为空！')
  }

  const hasOne = await Brand.findOne({
    where: {
      brandName,
      id: {
        [Op.ne]: id
      }
    }
  })
  if (hasOne) {
    return ctx.body = errorMsg('品牌已存在！')
  }

  const res = await Brand.update({
    brandName,
    brandFirstLetter,
    brandLogo,
    brandPicture,
    brandRemark,
    brandAuthProve
  }, {
    where: { id }
  })
  if (res) {
    return ctx.body = successMsg('修改成功！')
  }
})

router.post('/del', async ctx => {
  const { ids } = ctx.request.body
  await Brand.destroy({
    where: {
      id: {
        [Op.in]: ids.split(',')
      }
    }
  })
  return ctx.body = successMsg('删除成功')
})


module.exports = router