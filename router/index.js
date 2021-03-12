const router = require('koa-router')()
const common = require('./api/common')
const admin = require('./api/admin')
const brand = require('./api/brand')

// 登陆 注册
router.use('', common.routes())
// 管理员
router.use('/admin', admin.routes())
// 品牌
router.use('/brand', brand.routes())

module.exports = router