const os = require('os')

const base = require('./base')

//获取ip地址
function getIp(){
  let interfaces = os.networkInterfaces();
  for(let devName in interfaces){
    var iface = interfaces[devName];
    for(let i=0; i < iface.length; ++i){
      let alias = iface[i];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address;
      }
    }
  }
}

//获取操作系统数据
function getOsData(ctx, next){
  let data = {};
  data['cpu'] = os.arch();//cpu
  data['hostname'] = os.hostname();//主机名
  data['platform'] = os.platform();//平台
  data['ip'] = getIp();//ip

  ctx.body = {
    code: 0,
    data
  };
}


//测试代码
//测试不同环境下，调不同的功能函数
let testDiffOs = function(ctx, next){
  return base.handleDiffOs(ctx, next, testDiffOs_window, testDiffOs_linux)
}
function testDiffOs_linux(ctx, next){
  ctx.body = {
    code: 0,
    message: 'linux'
  };
}
function testDiffOs_window(ctx, next){
  ctx.body = {
    code: 0,
    message: 'window'
  };
}

module.exports = {
  getOsData,
  testDiffOs
}