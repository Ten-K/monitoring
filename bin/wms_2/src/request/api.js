
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
