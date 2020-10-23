module.exports = function (sequelize, DataTypes) {
  return sequelize.define('severityLevel', {
    id: {//ID
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
    },
    name: {//等级名称
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'name'
    },
    levelNo: {//等级编号
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'levelNo',
    }
  }, {
    freezeTableName: true
  })
}