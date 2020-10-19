module.exports = function (sequelize, DataTypes) {
    return sequelize.define('severityLevel', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'name'
        },
        levelNo: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'levelNo',
        }
    }, {
        freezeTableName: true
    })

}