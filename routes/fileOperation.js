
const router = require('koa-router')()

const fileOperation = require('../controllers/fileOperation')

router.prefix('/api/fileOperation')

// 获取系统根目录【window对应盘符，Linux对应根目录】
router.get('/rootList', fileOperation.getRoot)

// 获取指定路径的文件列表
router.post('/fileList', fileOperation.getFileList)

// 获取软件列表
router.post('/softwareList',fileOperation.getSoftwareList)

// 启动指定路径的软件
router.post('/openSoftware',fileOperation.openSoftware)

//获取当前正在执行的进程列表
router.post('/processList',fileOperation.getProcessList)

module.exports = router
