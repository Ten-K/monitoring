const router = require('koa-router')()
const file = require('../controllers/file')

router.prefix('/api/file')

router.get('/download', file.downloadFile)


module.exports = router