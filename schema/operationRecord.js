module.exports = function (sequelize, DataTypes) {
  return sequelize.define('operationRecord', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
      },
      pid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'pid',
      },
      filename: {
          type: DataTypes.STRING(350),
          allowNull: false,
          field: 'name',
      },
      path: {
          type: DataTypes.STRING(300),
          allowNull: false,
          field: 'path'
      },
      row: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'row',
      },
  }, {
      // 如果为 true 则表的名称和 model 相同，即 user
      // 为 false MySQL创建的表名称会是复数 users
      // 如果指定的表名称本就是复数形式则不变
      freezeTableName: true
  })

}