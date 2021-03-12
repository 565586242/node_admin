const Sequelize = require('sequelize')

const database = {
  host: 'localhost',
  port: '3306',
  database: 'shop',
  username: 'root',
  password: '123456'
}

const sequelize = new Sequelize(database.database, database.username, database.password, {
  host: database.host,
  port: database.port,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  timezone: '+08:00',
  dialectOptions: {
    dateStrings: true,
    typeCast(field, next) {
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    }
  }
})

/**
 * 初始化表
 * @param {String} table_name 表名称
 * @param {Array} table_option 表参数
 */
module.exports = {
  Sequelize,
  define(table_name, table_option = {}) {
    return sequelize.define(table_name, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ...table_option,
    }, {
      freezeTableName: true,
      createdAt: 'createTime',
      updatedAt: 'updateTime'
    });
  }
}
