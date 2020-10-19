const Router = require('koa-router')

const ActionsLogController = require('../controllers/actionsLog')

const router = new Router({
    prefix: '/api/v1'
})

// router.get('/', async (ctx, next) => {
//     ctx.response.status = 200;
//     ctx.body = {
//         code: 200,
//         msg: 'koa启动成功',
//     }
// })

/**
 * 路由接口
 */
//调用ddl文件接口
router.get('/article/ffiNapi',ActionsLogController.ffiNapi)
//批量创建
router.get('/actionsLog/create', ActionsLogController.create);
//查询所有数据
router.get('/actionsLog/listAll', ActionsLogController.listAll);
//删除所有数据（慎用）
router.get('/actionsLog/delete', ActionsLogController.delete);

module.exports = router