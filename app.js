const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const test = require('./routes/test')
const osData = require('./routes/osData')
const actionsLog = require('./routes/actionsLog')
const severityLevel = require('./routes/severityLevel')
const fileOperation = require('./routes/fileOperation')
const dbData = require('./routes/dbData')
const file = require('./routes/file')
const softwareDetail = require('./routes/softwareDetail')

const dbDataControllers = require('./modules/dbData')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public/file'))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(test.routes(), test.allowedMethods())
app.use(osData.routes(), osData.allowedMethods())
app.use(actionsLog.routes(), actionsLog.allowedMethods())
app.use(severityLevel.routes(), severityLevel.allowedMethods())
app.use(fileOperation.routes(),fileOperation.allowedMethods())
app.use(dbData.routes(), dbData.allowedMethods())
app.use(file.routes(), file.allowedMethods())
app.use(softwareDetail.routes(), softwareDetail.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// 定时任务：从 os.homedir().replace(/\\/g,'/')+'/Documents/WinMonitor' 文件夹下解析数据并存储到数据库中
function scheduleActionLoad(){
  // 每1分钟调用一次
  setInterval(dbDataControllers.resolveSoftwareDetail,60000)
}
scheduleActionLoad()
module.exports = app
