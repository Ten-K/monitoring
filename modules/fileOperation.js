const { exec,spawn,execFile }=require('child_process')
const iconv=require('iconv-lite')
const { join, resolve } = require('path')
const fs = require('fs')
const os = require('os')

const base = require('./base')
const { chdir } = require('process')
const { fstat } = require('fs')

/* windows操作 */
// 获取系统根目录 window
function getSystemDiskInfo_window(){
  return new Promise((resolve,reject)=>{
    let result=null
    let command=exec('wmic logicaldisk get caption',{encoding:'buffer'},(err,stdout,stderr)=>{
      if(err){
        reject(err)
      }
      result=iconv.decode(stdout,'cp936')
      result=result.trim()
      result=result.split('\n')
      for(let i in result){
        result[i]=result[i].replace(/\s+/g,"")
      }
      result.shift()
      resolve(result)
    })
    command.stdin.end()
  })
}
//获取指定路径下的文件列表 window
function getAppointPathFileDetailList_window(data){
  let path=data.path+'/'
  return new Promise((resolve,reject)=>{
    let result=null
    let command=exec('dir /b/ogn "'+path+'"',{encoding:'buffer'},(err,stdout,stderr)=>{
      if(err){
        reject(err)
      }
      result=iconv.decode(stdout,'cp936')
      result=result.split('\n')
      result.pop()
      for(let i in result){
        result[i]=result[i].trim()
      }
      let commandDir=exec('dir /ad /b/ogn "'+path+'"',{encoding:'buffer'},(err,stdout,stderr)=>{
        if(err){
          reject(err)
        }
        let dir=iconv.decode(stdout,'cp936')
        dir=dir.split('\n')
        dir.pop()
        for(let i in dir){
          dir[i]=dir[i].trim()
        }
        let response=[]
        result.forEach(item=>{
          let isDir=false
          if(dir.includes(item)){
            isDir=true
          }
          response.push({
            path:path+item,
            name:item,
            isDirectory:isDir
          })
        })
        resolve(response)
      })
      commandDir.stdin.end()
    })
    command.stdin.end()
  })
}
//获取软件列表 window
function powershell (cmd,callback){
  const ps = spawn('powershell', ['-NoProfile', '-Command', cmd], { encoding: 'buffer' })
  let chunks = []
  let err_chunks = []
  ps.stdout.on('data',chunk=>{
    chunks.push(iconv.decode(chunk,'cp936'))
  })
  ps.stderr.on('data',err_chunk=>{
    err_chunks.push(iconv.decode(err_chunk,'cp936'))
  })
  ps.on('close',code=>{
    let stdout=chunks.join("")
    let stderr=err_chunks.join("")
    callback(stdout,stderr)
  })
}
function getSoftwareDetailList_window(data){
  return new Promise((resolve,reject)=>{
    // err reject(err)
    // ok resolve(data)
    let filterValues = "Select-Object DisplayName,DisplayIcon,UninstallString,DisplayVersion,InstallDate,Publisher,InstallLocation"
    let localMatcine = `Get-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | ${filterValues}`
    let currentUser = `Get-ItemProperty HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | ${filterValues}`
    let Wow6432Node = `Get-ItemProperty HKLM:\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | ${filterValues}`
    let x64 = process.arch == 'x64' ? `;${Wow6432Node}` : ''
    powershell(`${localMatcine};${currentUser}${x64}`,(stdout,stderr)=>{
      let applist=[]
      let apps =stdout.trim().replace(/\r\n[ ]{10,}/g,"").split('\r\n\r\n')
      for(let app of apps){
        let dict = {}
        let lines=app.split('\r\n')
        for(let line of lines){
          if(line){
            let key = line.split(/\s+:\s*/)[0]
            let value = line.split(/\s+:\s*/)[1]
            dict[key] = value
          }
        }
        if(dict.DisplayName){
          dict.LegalName = dict.DisplayName.replace(/[\\\/\:\*\?\"\<\>\|]/g, "");
          var icon = join(os.tmpdir(), 'ProcessIcon', `${encodeURIComponent(dict.LegalName)}.png`);
          try{
            let iconPath= join(os.tmpdir(), 'ProcessIcon', `${dict.LegalName}.png`);
            dict.Icon=fs.readFileSync(iconPath.replace(/\\/g,"/"),'binary')
          }catch(err){
            dict.Icon=null
          }
          applist.push(dict);
        }
      }
      resolve(applist)
    })
  })
}
// 启动指定路径软件 window
function openSoftware_window(data){
  let path=data.path
  return new Promise((resolve,reject)=>{
    execFile(path, (err, data)=>{ 
      if (err) { 
        reject(err); 
      }
      resolve(data.toString())
    });
  })
}
// 当前进程列表 window
function getProcessList_window(data){
  return new Promise((resolve,reject)=>{
    // let cmd=process.platform=='win32'?'tasklist':'ps aux'
    exec('tasklist"',{encoding:'buffer'},function(err,stdout,stderr){
      if(err){
        reject(err)
      }
      stdout=iconv.decode(stdout,'cp936').trim().split('\n')
      stdout.shift()
      stdout.shift()
      let result=[]
      stdout.forEach(item=>{
        let processMessage = item.trim().split(/\s+/)
        let reg=/^[0-9]*$/
        if(reg.test(processMessage[1])){
          result.push({
            processName:processMessage[0],
            processId:processMessage[1]
          })
        }
      })
      result.sort((a,b)=>a.processName.localeCompare(b.processName))
      resolve(result)
    })
  })
}

/* linux操作 TODO: */
// 获取系统根目录 linux
function getSystemDiskInfo_linux(){}
// 获取指定路径的文件列表 linux
function getAppointPathFileDetailList_linux(path){}
//获取软件列表 linux
function getSoftwareDetailList_linux(data){}
//启动指定路径软件 linux
function openSoftware_linux(data){}
//当前的进程列表 linux
function getProcessList_linux(data){}



//系统根目录
let getSystemDiskInfo = function(ctx, next){
  return base.handleDiffOs(ctx, next, getSystemDiskInfo_window, getSystemDiskInfo_linux)
}
//指定路径文件列表
let getAppointPathFileDetailList = function(ctx, next){
  return base.handleDiffOs(ctx, next, getAppointPathFileDetailList_window, getAppointPathFileDetailList_linux)
}
//软件列表
let getSoftwareDetailList = function(ctx, next){
  return base.handleDiffOs(ctx, next, getSoftwareDetailList_window, getSoftwareDetailList_linux)
}
//启动指定软件
let openSoftware=function(ctx,next){
  return base.handleDiffOs(ctx,next,openSoftware_window,openSoftware_linux)
}
//获取当前的进程列表
let getProcessList=function(ctx,next){
  return base.handleDiffOs(ctx,next,getProcessList_window,getProcessList_linux)
}

module.exports = {
  getSystemDiskInfo,
  getAppointPathFileDetailList,
  getSoftwareDetailList,
  openSoftware,
  getProcessList
}