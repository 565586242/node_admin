const router = require('koa-router')()
const fs = require('fs')
const routerFiles = fs.readdirSync(__dirname)
const { isEmptyObject } = require('../utils')

/**
 * 筛选出 .js 的文件
 */
const filterRouters = routerFiles.filter(file => {
  return file.endsWith('.js') && file != 'index.js'
})

// 自动加载路由文件
filterRouters.forEach(file => {
  const requireFile = require(`${__dirname}/${file}`)
  if (!isEmptyObject(requireFile)) {
    router.use(requireFile.routes())
  }
})

module.exports = router