const menu = [
  {
    label: '主页',
    value: 'index',
    code: 'INDEX',
    icon: 'el-icon-rank'
  },{
    label: '测试',
    value: 'testRequest',
    icon: 'el-icon-menu',
    code: 'TEST',
  },{
    label: '严重等级',
    value: 'severityLevel',
    icon: 'el-icon-menu',
    code: 'SEVERITYLEVEL',
  },{
    label: '软件列表测试',
    value: 'softwareList',
    icon: 'el-icon-menu',
    code: 'SOFTWARELIST',
  },{
    label: '进程列表测试',
    value: 'processList',
    icon: 'el-icon-menu',
    code: 'PROCESSLIST',
  },
]

menu.forEach((item) => {
  const split = '/'
  item.href = `${split}${item.value}`
  if (item.children) {
    const menuHref = item.value ? `${item.href}/` : item.href
    item.children.forEach((itm) => {
      itm.href = `${menuHref}${itm.value}`
      if (itm.children) {
        const tplHref = `${itm.href}/`
        itm.children.forEach((cItm) => {
          cItm.href = `${tplHref}${cItm.value}`
        })
      }
    })
  }
})

module.exports = menu
