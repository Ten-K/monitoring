const ActionsLogModel = require('../modules/actionsLog')
const childProcess = require('child_process');
const path = require('path');

const ffi = require('ffi-napi');
const fs = require('fs')
const os = require('os')

const exec = childProcess.exec

class ActionsLogController {
    //批量创建
    static async create(ctx) {
        let pid=ctx.request.body.pid
        try {
            let data;
            let arr = []
            let filePath = os.homedir().replace(/\\/g,'/')+'/Documents/WinMonitor/' + pid + '/actions.log'
            let folderPath = os.homedir().replace(/\\/g,'/')+'/Documents/WinMonitor/' + pid
            let newData = await ActionsLogModel.getActionsLogOne(pid) || '';
            if (fs.existsSync(folderPath) && fs.existsSync(filePath)) {
                let con = fs.readFileSync(filePath, 'utf-8');

                //倒叙后移除第一个空值
                con = con.split("\n").reverse()
                con.splice(0,1)

                for (let key in con) {
                    con[key] = JSON.parse(con[key])
                    con[key]['pid'] = pid
                    //判断是否是最新插入数据时间，是：退出循环
                    if(newData.timestamp == con[key]['timestamp']){
                        break;
                    }
                    arr.unshift(con[key])
                }
                data = await ActionsLogModel.createActionsLog(arr);
            } else {
                data = '尚未监控程序或没有新的数据更新'
            }

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '新建成功',
                data
            }

        } catch (err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: '新建失败',
                data: err
            }
        }

    }


    //获取所有数据
    static async listAll(ctx) {
        try {
            let data = await ActionsLogModel.getActionsLogAll();
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data
            }

        } catch (err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: '查询失败',
                data: err
            }
        }
    }

    //删除全部数据
    static async delete(ctx) {
        try {
            let data = await ActionsLogModel.delActionsLogAll();
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data
            }

        } catch (err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: '查询失败',
                data: err
            }
        }
    }

    //调用dll开启程序监听接口
    static async functionHook32(ctx) {
        let pid = ctx.request.body.pid
        try {
            let data;
            const DHDpath = path.join(__dirname, '../dll/DllInjectHelperDll.dll')
            const FHpath = path.join(__dirname, '../dll/FunctionHook32.dll')
            const DllInjectHelperDll = new ffi.Library(DHDpath, {
                'InjectDll': ['int', ['int', 'string']]
            });
            let code = DllInjectHelperDll.InjectDll(pid,FHpath)
            if (code === 1) {
                data = "监听成功，正在监听当前pid程序"
            } else {
                data = "监听失败，检查监听的程序是否是32位"
            }
            ctx.response.status = 200;
            ctx.response.body={
                code:code==1?'0':'1013',
                message:data
            }
        } catch (err) {
            ctx.response.status = 412;
            ctx.response.body = {
                code: '412',
                message: '系统异常'
            }
        }
    }

    //调用dll关闭程序监听接口
    static async FunctionHookRemoveHelper32(ctx) {
        let pid = ctx.request.body.pid
        try {
            let data;
            const DHDpath = path.join(__dirname, '../dll/DllInjectHelperDll.dll')
            const FHRpath = path.join(__dirname, '../dll/FunctionHookRemoveHelper32.dll')
            const DllInjectHelperDll = new ffi.Library(DHDpath, {
                'InjectDll': ['int', ['int', 'string']]
            });
            let code = DllInjectHelperDll.InjectDll(pid,FHRpath)
            if (code === 1) {
                data = "关闭成功"
            } else {
                data = "关闭失败，检查关闭的程序是否是32位"
            }
            ctx.response.status = 200;
            ctx.response.body={
                code:code==1?'0':'1014',
                message:data
            }
        } catch (err) {
            ctx.response.status = 412;
            ctx.response.body = {
                code: '412',
                message: '查询失败',
            }
        }
    }
}

module.exports = ActionsLogController