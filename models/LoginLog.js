/* 登陆日志 */
const { define, Sequelize } = require('../utils/db')

const LoginLog = define("login_log", {
  ip: Sequelize.STRING,
  browser: Sequelize.STRING,
  loginAddress: Sequelize.STRING
});

/* (async () => {
  await LoginLog.sync({ alter: true })
  console.log("login_log模型同步完毕");
})(); */

module.exports = LoginLog