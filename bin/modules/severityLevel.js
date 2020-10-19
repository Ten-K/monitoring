const db = require('../config/sqlite');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const SeverityLevel = Sequelize.import('../schema/severityLevel');
// 自动创建表
SeverityLevel.sync({
  force: false
});

//获取所有严重等级
async function getSeverityLevel(data){
  return await SeverityLevel.findAll()
}

//创建严重等级
async function createSeverityLevel(data){
  return await SeverityLevel.create(data)
}

//删除严重等级
async function delSeverityLevel(data){
  const severityLevel = await SeverityLevel.findOne({
    where: {
      id: data.id
    }
  })
  return await severityLevel.destroy();
}

module.exports = {
  getSeverityLevel,
  createSeverityLevel,
  delSeverityLevel
}