const fs = require('fs');

function downloadFile(ctx, next){
  if(!ctx.request.body.pid || !ctx.request.body.fileName){
    ctx.body = {
      code: '1',
      msg: '缺少参数'
    }
  }
  let filePath = os.homedir().replace(/\\/g,'/')+'/Documents/WinMonitor/' + ctx.request.body.pid + '/' + ctx.request.body.fileName;
  ctx.body = fs.createReadStream(filePath);
  
}

module.exports = {
  downloadFile
}
