const ActionsLogModel = require('../modules/actionsLog')
const childProcess = require('child_process');
const path = require('path');

const ffi = require('ffi-napi');
const fs = require('fs')

const exec = childProcess.exec

class ActionsLogController {
    //批量创建
    static async create(ctx) {
        try {
            let pid = 13772;
            let arr = []
            let con = fs.readFileSync('C:/Users/zhouz/Documents/WinMonitor/' + pid + '/actions.log', 'utf-8');
            con = con.split("\n")
            for (let key in con) {
                if (key < con.length - 1) {
                    con[key] = JSON.parse(con[key])
                    con[key]['pid'] = pid
                    // 创建文章模型
                    arr.push(con[key])
                }
            }
            let data = await ActionsLogModel.createActionsLog(arr);

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
                data:err
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
                data:err
            }
        }
    }

    //调用dll文件
    static async ffiNapi(ctx) {
        try {
            let data;
            let pid = 13772;
            const ffipath = path.join(__dirname, '../dll/DllInjectHelperDll.dll')
            const DllInjectHelperDll = new ffi.Library(ffipath, {
                'InjectDll': ['int', ['int', 'string']]
            });
            let code = DllInjectHelperDll.InjectDll(pid, 'D:/privateCode/koa2/koa2_demo/dll/FunctionHookRemoveHelper32.dll')
            if (code === 1) {
                data = fs.readFileSync('C:/Users/zhouz/Documents/WinMonitor/' + pid + '/actions.log', 'utf-8');
                data = data.split("\n")
                for (let key in data) {
                    if (key < data.length - 1) {
                        data[key] = JSON.parse(data[key])
                    }
                }
            } else {
                data = "监听失败，检查监听的程序是否是32位"
            }
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data: {
                    data
                }
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
}

module.exports = ActionsLogController