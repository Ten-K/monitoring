const router = require('koa-router')()

router.prefix('/test')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a test response!'
})

router.get('/get', function (ctx, next) {
  ctx.body = {
    code: 0,
    message: 'this is a test/get response'
  }
})

router.post('/post', function (ctx, next) {
  ctx.body = {
    code: 0,
    message: JSON.stringify(ctx.request.body)
  }
})

module.exports = router
