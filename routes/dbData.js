const router = require('koa-router')()

const dbData = require('../controllers/dbData')

router.prefix('/api/dbData')



//根据pid更新数据库数据
router.post('/updateDBData', dbData.updateDBData)

//删除数据库数据
router.post('/delDBData', dbData.delDBData)

//获取数据库数据
router.get('/getDBDataAll', dbData.getDBDataAll)

module.exports = router
