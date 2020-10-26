<template>
  <div id="test">
    测试请求
    <button @click="monitor">监听</button>
    <button @click="closeMonitoring">关闭监听</button>
    <button @click="delDBData">删除SoftwareDetail数据</button>
    <button @click="getDBData">获取数据</button>
    <!-- <button @click="getSoftwareDetail">获取软件详情</button> -->
    <button @click="updateDBData">更新数据库</button>
    <button @click="delDBData">删除SoftwareDetail数据</button>
  </div>
</template>
<script>
export default {
  methods: {
    getDBData(){
      this.$http({
        url: this.$api.apiDbDataGetDBDataAll,
        method: 'GET',
      }).then((r) => {
        if (r.code === '0') {
          console.log('GET ->')
          console.log(r)
        }
      })
    },
    monitor(){
      this.$http({
        url: this.$api.apiV1ActionsLogFunctionHook32,
        method: 'POST',
        data: {
          pid: '9016'
        }
      }).then((r) => {
        if (r.code === '0') {
          console.log('POST ->')
          console.log(r)
        }
      })
    },
    closeMonitoring(){
      this.$http({
        url: this.$api.apiV1ActionsLogFunctionHookRemoveHelper32,
        method: 'POST',
        data: {
          pid: '9016'
        }
      }).then((r) => {
        if (r.code === '0') {
          console.log('POST ->')
          console.log(r)
        }
      })
    },
    getSoftwareDetail(){
      this.$http({
        url: this.$api.apiSoftwareDetailGet,
        method: 'POST',
        data: {
          pid: '9016'
        }
      }).then((r) => {
        if (r.code === '0') {
          console.log('POST ->')
          console.log(r)
        }
      })
    },
    updateDBData(){
      this.$http({
        url: this.$api.apiDbDataUpdateDBData,
        method: 'POST',
        data: {
          pid: '9016'
        }
      }).then((r) => {
        if (r.code === '0') {
          console.log('POST ->')
          console.log(r)
        }
      })
    },
    delDBData(){
      this.$http({
        url: this.$api.apiDbDataDelDBData,
        method: 'POST',
        data: {
          pid: '9016'
        }
      }).then((r) => {
        if (r.code === '0') {
          console.log('POST ->')
          console.log(r)
        }
      })
    },
  }
}
</script>