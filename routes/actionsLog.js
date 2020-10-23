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
//调用dll开启程序监听接口
router.post('/actionsLog/functionHook32',ActionsLogController.functionHook32)
//调用dll关闭程序监听接口
router.post('/actionsLog/FunctionHookRemoveHelper32',ActionsLogController.FunctionHookRemoveHelper32)

//批量创建
router.post('/actionsLog/create', ActionsLogController.create);
//查询所有数据
router.get('/actionsLog/listAll', ActionsLogController.listAll);
//删除所有数据（慎用）
router.get('/actionsLog/delete', ActionsLogController.delete);

module.exports = router