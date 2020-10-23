const fileOperation = require('../modules/fileOperation')

// 获取系统根目录
async function getRoot(ctx,next){
  await fileOperation.getSystemDiskInfo().then(data => {
    ctx.response.body = {
      code:'0',
      data
    }
  }).catch(err=>{
    ctx.response.body = {
      code: '1001',
      message: err
    };
  })
}

// 获取指定路径的文件列表
async function getFileList(ctx,next){
  const rb = ctx.request.body
  await fileOperation.getAppointPathFileDetailList(rb).then(data=>{
    ctx.response.body={
      code:'0',
      data
    }
  }).catch(err=>{
    ctx.response.body = {
      code: '1001',
      message: err
    };
  })
}

// 获取软件列表
async function getSoftwareList(ctx,next){
  const rb = ctx.request.body
  await fileOperation.getSoftwareDetailList(rb).then(data=>{
    ctx.response.body={
      code:'0',
      data
    }
  }).catch(err=>{
    ctx.response.body = {
      code: '1001',
      message: err
    };
  })
}

// 启动指定路径的软件
async function openSoftware(ctx,next){
  const rb=ctx.request.body
  await fileOperation.openSoftware(rb).then(r=>{
    ctx.response.body={
      code:'0',
      message:'启动成功'
    }
  }).catch(err=>{
    ctx.response.body={
      code:'1002',
      message:'启动失败'
    }
  })
}

// 获取当前进程列表
async function getProcessList(ctx,next){
  const rb=ctx.request.body
  await fileOperation.getProcessList(rb).then(data=>{
    ctx.response.body={
      code:'0',
      data
    }
  }).catch(err=>{
    ctx.response.body={
      code:'1001',
      message:err
    }
  })
}
module.exports = {
  getRoot,
  getFileList,
  getSoftwareList,
  openSoftware,
  getProcessList
}