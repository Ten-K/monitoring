<template>
  <div class="softwareList">软件列表
    <div class="list" v-for='(item,index) in softwareList' :key="index">
      <img :src="item.Icon" alt="" width="50px" height="50px">
      <div class="softwareDetails">
        <div>{{item.DisplayName}}</div>
        <div><span>版本号：{{item.DisplayVersion}}</span><span>发布者：{{item.Publisher}}</span></div>
      </div>
      <div><el-button size='mini' type='primary' :disabled='item.DisplayIcon==""' @click="open(item.DisplayIcon)">打开</el-button></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      softwareList:[]
    }
  },
  created(){
    this.$http({
        url: this.$api.apiFileOperationSoftwareList,
        method: 'POST',
        data:{}
      }).then((r) => {
        if(r.code=='0'){
          console.log(r);
          this.softwareList=r.data
          this.softwareList.forEach(item=>{
            if(item.Icon){
              const buffer=new Buffer(item.Icon,'binary')
              buffer.toString('base64')
              item.Icon = 'data: image/png;base64,' + buffer.toString('base64');
            }
          })
        }
      })
  },
  methods:{
    open(path){
      path=path.replace(/\\/g,"/")
      this.$http({
        url:this.$api.apiFileOperationOpenSoftware,
        method:'POST',
        data:{
          path
        }
      }).then(r=>{
        console.log(r);
      })
    }
  }
}
</script>

<style lang='less' scoped>
.softwareList{
  .list{
    display: flex;
    padding:10px;
    border:1px solid #eee;
    align-items: center;
    .softwareDetails{
      flex: 1;
      margin-left: 10px;
      span{
        margin-right: 20px;
        font-size: 12px;
        color: #333;
      }
    }
  }
}
</style>