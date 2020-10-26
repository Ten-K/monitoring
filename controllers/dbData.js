const dbData = require('../modules/dbData')


//根据pid更新数据库SoftwareDetail表的数据
async function updateDBData(ctx, next){
  if(!ctx.request.body.pid){
    ctx.body = {
      code: '1',
      message: '缺少参数'
    }
    return;
  }
  let data = await dbData.updateDBData(ctx.request.body.pid)
  ctx.body = {
    code: '0',
    data
  }
}



//删除数据库SoftwareDetail表的数据
async function delDBData(ctx, next){
  await dbData.delDBData(ctx.request.body.pid)
  ctx.body = {
    code: '0',
    message: '删除成功'
  }
}



//根据pid获取SoftwareDetail表的数据
async function getDBDataAll(ctx, next){
  try {
    let data = await dbData.getDBDataAll();
    ctx.response.status = 200;
    ctx.body = {
      code: '0',
      msg: '查询成功',
      data
    }
  } catch (err) {
    ctx.response.status = 412;
    ctx.body = {
      code: '1',
      msg: '查询失败',
      data: err
    }
  }
}
module.exports = {
  updateDBData,
  delDBData,
  getDBDataAll
}
