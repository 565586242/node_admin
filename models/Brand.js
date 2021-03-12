/* 品牌 */
const { Sequelize, define } = require('../utils/db')

const Brand = define('brand', {
  brandName: Sequelize.STRING,
  brandFirstLetter: Sequelize.STRING,
  brandLogo: Sequelize.STRING,
  brandPicture: Sequelize.STRING,
  brandRemark: Sequelize.STRING,
  brandAuthProve: Sequelize.STRING
})

/* ;(async () => {
  await Brand.sync({ alter: true })
  console.log("brand模型同步完毕");
})(); */

module.exports = Brand