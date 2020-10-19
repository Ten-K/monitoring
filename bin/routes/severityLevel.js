const router = require('koa-router')()

const severityLevel = require('../controllers/severityLevel')

router.prefix('/api/severityLevel')


//获取所有严重等级
router.get('/get', severityLevel.getSeverityLevel)

//创建严重等级
router.post('/create', severityLevel.createSeverityLevel)

//删除严重等级
router.post('/del', severityLevel.delSeverityLevel)

module.exports = router
