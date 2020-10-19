const os = require('os')

//检测环境，根据环境调用不同的函数
function handleDiffOs(ctx, next, cb_win, cb_linux){
  if(os.platform() === 'linux'){
    //在linux环境下
    cb_linux(ctx, next);
  }else{
    //在window环境下
    cb_win(ctx, next);
  }
}


module.exports = {
  handleDiffOs,
}