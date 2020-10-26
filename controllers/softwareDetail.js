const softwareDetail = require('../modules/softwareDetail')

async function getList(ctx, next){
  if(!ctx.request.body.data.type){
    ctx.body = {
      code: '1',
      message: '缺少参数'
    }
  }
  let list;
  switch(ctx.request.body.data.type){
    case 1: 
      list = await softwareDetail.getNetworkAccessList(ctx.request.body);
      break;
  }
  let startNum = ctx.request.body.pageSize * ctx.request.body.pageNo;
  ctx.body = {
    code: '0',
    data: list.slice(startNum, startNum + ctx.request.body.pageSize),
    pageNo: ctx.request.body.pageNo + 1,
    pageSize: ctx.request.body.pageSize,
    totalItems: list.length,
    totalPage: Math.ceil(list.length / ctx.request.body.pageSize) 
  };                                                                                                                                                                                                                                                           
}

module.exports = {
  getList
}