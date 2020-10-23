<template>
  <div class="processList">软件列表
    <div class="list">
      <div class="softwareDetails">进程名称</div>
      <div class="softwareDetails">进程pid</div>
      <div class="softwareDetails">操作</div>
    </div>
    <div class="list" v-for='(item,index) in processList' :key="index">
      <div class="softwareDetails">
        {{item.processName}}
      </div>
      <div class="softwareDetails">
        {{item.processId}}
      </div>
      <div class="softwareDetails">
        <el-button size='mini' type='primary' @click="start(item.processId)">执行监听</el-button>
        <el-button size='mini' style="margin-left:20px" @click="cancel(item.processId)">取消监听</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      processList:[]
    }
  },
  created(){
    this.$http({
      url: this.$api.apiFileOperationProcessList,
      method: 'POST',
      data:{}
    }).then((r) => {
      if(r.code=='0'){
        this.processList=r.data
      }
    })
  },
  methods:{
    start(pid){
      this.$http({
        url: this.$api.apiV1ActionsLogFunctionHook32,
        method: 'POST',
        data:{
          pid:pid
        }
      }).then((r) => {
        if(r.code=='0'){
          this.$notify({
            message: '执行监听成功',
            type: 'success'
          })
        }
      })
    },
    cancel(pid){
      this.$http({
        url: this.$api.apiV1ActionsLogFunctionHookRemoveHelper32,
        method: 'POST',
        data:{
          pid:pid
        }
      }).then((r) => {
        if(r.code=='0'){
          this.$notify({
            message: '取消监听成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.processList{
  .list{
    display: flex;
    padding:10px;
    border:1px solid #eee;
    align-items: center;
    .softwareDetails{
      flex: 1;
      margin-left: 10px;
    }
  }
}
</style>