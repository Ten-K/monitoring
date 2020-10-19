const SeverityLevel = require('../modules/severityLevel')

//创建严重等级
async function createSeverityLevel(ctx, next){
  try{
    await SeverityLevel.createSeverityLevel(ctx.request.body);
  }catch(err){
    console.log('err -> ')
    console.log(err)
    ctx.body = {
      code: 1,
      message: '系统错误'
    }
    return;
  }
  ctx.body = {
    code: 0,
    message: 'success'
  }
}

//获取所有严重等级
async function getSeverityLevel(ctx, next){
  let data = await SeverityLevel.getSeverityLevel()
  ctx.body = {
    code: 0,
    data
  }
}

//删除严重等级
async function delSeverityLevel(ctx, next){
  let data = await SeverityLevel.delSeverityLevel(ctx.request.body)
  ctx.body = {
    code: 0,
    data,
    message: 'success'
  }
}
module.exports = {
  createSeverityLevel,
  getSeverityLevel,
  delSeverityLevel
}
