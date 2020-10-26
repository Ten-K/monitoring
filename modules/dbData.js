const fs = require('fs');
const os = require('os');
const path = require('path');
const base = require('./base')
// const findProcess = require('find-process');
const jschardet = require('jschardet');
const { Op } = require("sequelize");
const db = require('../config/sqlite');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const SoftwareDetail = Sequelize.import('../schema/softwareDetail');
const OperationRecord = Sequelize.import('../schema/operationRecord')
// 自动创建表
SoftwareDetail.sync({
  force: false
});
OperationRecord.sync({
  force: false
});

//根据pid获取进程信息
function getProcessDetailFromPid(pid){
  findProcess('pid', pid).then((list) => {
    console.log('getProcessDetailFromPid')
    console.log(list)
    return list;
  }), (err) => {
    return err;
  }
}



//批量创建SoftwareDetail表的数据
async function createData(pid, actionsFileName,row){
  try {
    let data;
    let arr = [];
    let filePath = os.homedir().replace(/\\/g,'/')+'/Documents/WinMonitor/' + pid + '/' + actionsFileName;
    let folderPath = os.homedir().replace(/\\/g,'/')+'/Documents/WinMonitor/' + pid;
    if (fs.existsSync(folderPath) && fs.existsSync(filePath)) {
      let con = fs.readFileSync(filePath, 'utf-8');
      con = con.split("\n")
      let exePath = JSON.parse(con[0])['action']['path'];
      let key=row
      for (;key<con.length;key++) {
        if(con[key] === ''){
          break;
        }
        con[key] = JSON.parse(con[key]);
        let dataObj = {...con[key], ...con[key]['action']};
        //根据type处理数据
        switch(con[key]['action']['type']){
          case 4097: 
            let detail = await getDetailFormNetworkFile(pid, con[key]['action']['socketFd']);
            dataObj['targetIp'] = detail['Host'];
            dataObj['protocol'] = detail['protocol'];
            if(dataObj['socketFd']){
              dataObj['fd'] = dataObj['socketFd'];
              delete dataObj.socketFd;
            }
            break;
        }
        dataObj['pid'] = pid;
        dataObj['name'] = exePath.split('\\').pop();
        dataObj['exePath'] = exePath;
        delete dataObj.action;
        arr.push(dataObj);
      }
      let repath=pid+'/'+actionsFileName
      await OperationRecord.update({
        row:key
      },{
        where:{
          path:repath
        }
      })
      if(con[key-1]['action']['type']===4095){
        //转移文件
        let fileDirPath = path.join(folderPath, 'file');
        if(!fs.existsSync(fileDirPath)){
          fs.mkdirSync(fileDirPath);
        }
        fs.createReadStream(filePath).pipe(fs.createWriteStream(path.join(fileDirPath, actionsFileName)));
        fs.unlink(filePath, function(err){
          return false;
        });
        // 删除OperationRecord的记录
        await OperationRecord.destroy({
          where:{
            path:repath
          }
        })
      }

      //在数据库表中创建数据
      data = await SoftwareDetail.bulkCreate(arr);
      
    } else {
      data = '尚未监控程序或没有新的数据更新'
    }
    return data;
  } catch (err) {
    return '系统异常';
  }
}

//获取actions文件列表
function findActionsFiles(pid){
  let filePath = os.homedir().replace(/\\/g,'/')+'/Documents/WinMonitor/' + pid;
  const files = fs.readdirSync(filePath);
  return files.filter(itemInF => /^actions_/.test(itemInF));
}


//解析网络请求文件
async function getDetailFormNetworkFile(pid, fd){
  let filePath = os.homedir().replace(/\\/g,'/')+'/Documents/WinMonitor/' + pid + '/' + fd;
  let fileContent = fs.readFileSync(filePath).toString();
  let encoding = await jschardet.detect(fileContent);
  if(!encoding.encoding) return '';
  if(encoding.encoding === 'ascii'){
    let contentList = fileContent.split('\n');
    let dataObj = {};
    for(let index in contentList){
      if(index === '0'){
        let arr = contentList[index].split(' ');
        dataObj['method'] = arr[0];
        dataObj['url'] = arr[1];
        dataObj['protocol'] = arr[2];
      }else if(/:\s/.test(contentList[index])){
        let arr = contentList[index].split(': ');
        dataObj[arr[0]] = arr[1];
      }
    }
    return dataObj;
  }
  return {};
}

// 更新数据
async function updateDBData(pid){
  const actionsFileList = findActionsFiles(pid);
  let result = [];
  for(let index in actionsFileList){
    let data = await createData(pid, actionsFileList[index]);
    result.push(data);
  }
  return result;
}

//获取最新的一条数据
async function getTheLatestOne(pid){
  return await SoftwareDetail.findOne({
    order: [
      ['id', 'DESC']
    ],
    where:{
      pid
    }
  })
}

//删除数据
async function delDBData() {
  return await SoftwareDetail.destroy({ 
    where: {}, 
    truncate: true 
  }) 
}

//查询所有数据
async function getDBDataAll() {
  return await SoftwareDetail.findAll()
}

// 更新softwareDetail windows
async function resolveSoftwareDetail_window(){
  let basePath=os.homedir().replace(/\\/g,'/')+'/Documents/WinMonitor/'
  let isExists = await new Promise((resolve,reject)=>{
    fs.stat(basePath,(err,stats)=>{
      if(err){
        reject(false)
      }
      resolve(stats)
    })
  }).then(res=>res).catch(err=>err)
  if(isExists){
    let dirs=fs.readdirSync(basePath)
    let files=[]
    dirs.forEach(item=>{
      findActionsFiles(item).forEach(subItem=>{
        files.push({
          pid:item,
          filename:subItem,
          repath:item+'/'+subItem
        })
      })
    })
    for(let item of files){
      let [record] = await OperationRecord.findOrCreate({
        where:{path:item.repath},
        defaults:{
          pid:item.pid,
          filename:item.filename,
          row:0
        }
      })
      createData(item.pid, item.filename,record.row)
    }
  }
}
// 更新softwareDetail linux
function resolveSoftwareDetail_linux(){}
let resolveSoftwareDetail=function(ctx,next){
  return base.handleDiffOs(ctx,next,resolveSoftwareDetail_window,resolveSoftwareDetail_linux)
}
//搜索数据
async function searchDBData(whereObj){
  //处理查询条件
  let whereParams = {};
  for(let key in whereObj){
    if(whereObj.operatingTimeEnd || whereObj.operatingTimeStart){
      whereParams.timestamp = {
        [Op.lt]: new Date(whereObj.operatingTimeEnd),
        [Op.gt]: new Date(whereObj.operatingTimeStart)
      }
    }else{
      whereParams[key] = {
        [Op.like]: `%${whereObj[key]}%`
      }
    }
  }
  //搜索数据
  return await SoftwareDetail.findAll({
    order: [
      ['timestamp', 'DESC']
    ],
    where: whereParams
  })
}

module.exports = {
  updateDBData,
  delDBData,
  getDBDataAll,
  resolveSoftwareDetail,
  searchDBData
}