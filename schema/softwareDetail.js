module.exports = function (sequelize, DataTypes) {
    return sequelize.define('actionsLog', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: true,
            field: 'name',
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'type',
        },
        time: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'time',
        },
        file_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'file_name',
        },
        file_location: {
            type: DataTypes.STRING(350),
            allowNull: true,
            field: 'file_location',
        },
        read_and_write_type: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'read_and_write_type',
        },
        document_sensitivity: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'document_sensitivity',
        },
        call_process_parameters: {
            type: DataTypes.STRING(450),
            allowNull: true,
            field: 'call_process_parameters'
        },
        target_ip: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'target_ip'
        },
        agreement_type: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'agreement_type'
        },
        sensitive_data_field: {
            type: DataTypes.STRING(500),
            allowNull: true,
            field: 'sensitive_data_field'
        },
        network_traffic: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'network_traffic'
        },
        port: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'port'
        },
        socketFd: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'socketFd'
        },
        with_attachment: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'with_attachment'
        },
        uuid: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'uuid'
        },
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })

}