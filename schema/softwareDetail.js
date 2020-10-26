module.exports = function (sequelize, DataTypes) {
    return sequelize.define('softwareDetail', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        pid: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'pid',
        },
        name: {
            type: DataTypes.STRING(350),
            allowNull: true,
            field: 'name',
        },
        exePath: {
            type: DataTypes.STRING(350),
            allowNull: true,
            field: 'exePath',
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'type',
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'timestamp',
        },
        fileName: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'fileName',
        },
        fileLocation: {
            type: DataTypes.STRING(350),
            allowNull: true,
            field: 'fileLocation',
        },
        readAndWriteType: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'readAndWriteType',
        },
        documentSensitivity: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'documentSensitivity',
        },
        callProcessParameters: {
            type: DataTypes.STRING(450),
            allowNull: true,
            field: 'callProcessParameters'
        },
        targetIp: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'targetIp'
        },
        protocol: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'protocol'
        },
        sensitiveDataField: {
            type: DataTypes.STRING(500),
            allowNull: true,
            field: 'sensitiveDataField'
        },
        bytes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'bytes'
        },
        port: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'port'
        },
        fd: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'fd'
        },
        withAttachment: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'withAttachment'
        },
        uuid: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'uuid'
        },
        access: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'access'
        },
        path: {
            type: DataTypes.STRING(300),
            allowNull: true,
            field: 'path'
        },
        key: {
            type: DataTypes.STRING(300),
            allowNull: true,
            field: 'key'
        },
        parent: {
            type: DataTypes.STRING(300),
            allowNull: true,
            field: 'parent'
        },
        valueType: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'valueType'
        },
        valueName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'valueName'
        },
        oldData: {
            type: DataTypes.STRING(300),
            allowNull: true,
            field: 'oldData'
        },
        data: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'data'
        },
        cmdLine: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'cmdLine'
        },
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })

}