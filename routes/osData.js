
const router = require('koa-router')()

const osData = require('../modules/osData')

router.prefix('/osData')

//获取操作系统数据
router.get('/get', osData.getOsData)

//测试代码，不同的操作系统调不同的处理函数
router.get('/testDiffOs', osData.testDiffOs)

module.exports = router
