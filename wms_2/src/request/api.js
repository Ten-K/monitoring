
let apiArr = [
  // 通用接口
  // 'admin/file/download', // 文件下载
  // 'admin/file/uploadBase64', // 文件上传，base64
  // 'admin/file/uploadFileCKEditor', // CKEditor文件上传
  // '/api/admin/file/upload',   // 上传图片
  // '/api/admin/file/uploadImageCKEditor', //CKEditor用图片上传

  
  // 'admin/login', // 登录
  // 'admin/logout', // 退出登录
  // 'admin/admin/identity', // 管理员本人信息
  'test/get', // 测试接口
  'test/post', // 测试接口
  'api/severityLevel/create', // 创建严重等级
  'api/severityLevel/get', // 获取严重等级
  'api/severityLevel/del', // 删除严重等级
  'api/v1/actionsLog/functionHook32',//调用dll开启程序监听接口
  'api/v1/actionsLog/FunctionHookRemoveHelper32',//调用dll关闭程序监听接口

  'api/fileOperation/rootList', // 根目录列表
  'api/fileOperation/fileList', // 文件列表
  'api/fileOperation/softwareList',//软件列表
  'api/fileOperation/processList',//软件列表
  'api/fileOperation/openSoftware',//启动软件
  'api/fileOperation/openSoftwareAction',//启动软件并监控
  'api/softwareDetail/get', //获取软件详情
  'api/dbData/updateDBData', //更新数据库数据
  'api/dbData/delDBData', //删除数据库数据
  'api/dbData/getDBDataAll', //获取数据库数据
  'api/softwareDetail/list', //获取详情
  'api/file/download', //下载文件
]

const exportObj = {}

apiArr.forEach((api) => {
  if (api.indexOf('/api/') !== -1) {
    const tplApi = api.split('/api/')[1]
    if (process.env.NODE_ENV === 'development') {
      exportObj[tplApi.replace(/\/./g, char => char.substring(1).toUpperCase())] = `/api/${tplApi}`
    } else {
      exportObj[tplApi.replace(/\/./g, char => char.substring(1).toUpperCase())] = `/ys2/api/${tplApi}`
    }
  } else {
    exportObj[api.replace(/\/./g, char => char.substring(1).toUpperCase())] = api
  }
})

export default exportObj
