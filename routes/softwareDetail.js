const router = require('koa-router')()

const softwareDetail = require('../controllers/softwareDetail')

router.prefix('/api/softwareDetail')


//获取数据库数据
router.post('/list', softwareDetail.getList)

module.exports = router
