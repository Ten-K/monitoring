const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('actionsLog', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        pid: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'pid',
        },
        action_host: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'action_host',
        },
        action_port: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'action_port',
        },
        action_bytes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'action_bytes',
        },
        action_socketFd: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'action_socketFd',
        },
        action_type: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'action_type',
        },
        timestamp: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'timestamp',
        },
        uuid: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'uuid'
        },
        withAttachment: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'withAttachment'
        },
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })

}