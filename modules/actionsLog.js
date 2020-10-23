const db = require('../config/sqlite');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const ActionsLog = Sequelize.import('../schema/actionsLog');
// 自动创建表
ActionsLog.sync({
    force: false
});

class ActionsLogModel {
    //批量创建
    static async createActionsLog(data) {
        let arr = []
        for(let con of data){
            arr.push({
                pid: con.pid,
                action_host: con.action.host || '',
                action_port: con.action.port || null,
                action_bytes: con.action.bytes || null,
                action_socketFd: con.action.socketFd,
                action_type: con.action.type,
                timestamp: con.timestamp,
                uuid: con.uuid,
                withAttachment: con.withAttachment,
            })
        }
        return await ActionsLog.bulkCreate(arr)
    }

    //查询所有数据
    static async getActionsLogAll() {
        return await ActionsLog.findAll()
    }

    //删除所有数据（慎用）
    static async delActionsLogAll() {
        return await ActionsLog.destroy({ 
            where: {}, 
            truncate: true 
        }) 
    }

    //根据id查询最新数据
    static async getActionsLogOne(pid){
        return await ActionsLog.findOne({
            order: [
                ['id', 'DESC']
            ],
            where:{
                pid
            }
        })
    }
}

module.exports = ActionsLogModel