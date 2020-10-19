const path = require('path')
const Sequelize = require('sequelize')
const sqlite3 = require('sqlite3').verbose()

const sequelize = new Sequelize(undefined, undefined, undefined, {
  // sqlite的存储位置,仅sqlite有用
  storage: path.join(__dirname, '../db/database.sqlite'),
  // 自定义链接地址，可以是ip或者域名，默认本机：localhost
  host: 'localhost',
  // 数据库类型，支持: 'mysql', 'sqlite', 'postgres', 'mssql'
  dialect: 'sqlite',
  dialectModule: sqlite3,
  operatorsAliases: false,
  // 连接池配置
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // 数据库默认参数,全局参数
  define: {
    underscored: false,
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: true
  },
  // 是否开始日志，默认是用console.log
  logging: true,
}) // sqlite： 前三个参数传 undefined。


module.exports = {
  sequelize
}