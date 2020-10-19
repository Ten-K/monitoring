const router = require('koa-router')()
const ffi = require('ffi-napi')
const path = require('path')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  const ffipath = path.join(__dirname,'../dll/DllInjectHelperDll.dll')
  const myUser32 = new ffi.Library(ffipath, {
      'InjectDll': ['int', ['int', 'string']]
  });
})

module.exports = router
