
const router = require('koa-router')()
const fs = require('fs')

//将views下的html文件通过Get请求返回
let requireHtmlFile = fs.readdirSync('views').filter((fileName) => {
  let fileReg = /.html$/;
  return fileReg.test(fileName);
}).map((fileName) => {
  router.get(`/${fileName}`, async (ctx, next) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(`views/${fileName}`);
  })
})

// '/' 直接返回 views/index.html
router.get('/', async (ctx, next) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('views/index.html');
})

module.exports = router
