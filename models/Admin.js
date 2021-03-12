const { define, Sequelize } = require('../utils/db')

const Admin = define("admin", {
  // 账号
  account: Sequelize.STRING,
  // 邮箱
  email: Sequelize.STRING,
  // 部门id
  rootId: Sequelize.INTEGER,
  // 密码
  password: Sequelize.STRING,
  // 备注
  remark: Sequelize.STRING
});

/* (async () => {
  await Admin.sync({ alter: true })
  console.log("admin模型同步完毕");
})(); */

module.exports = Admin