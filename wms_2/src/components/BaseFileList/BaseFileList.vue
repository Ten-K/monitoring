<template>
  <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
    :show-close='false'
    width="720px"
    class='fileList'
    :close-on-click-modal="false">
    <div class="listContent">
      <div class="topTitle">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><a href="javascript:;" @click="getDisk">此电脑</a></el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item,index) in path" :key='index'><a href="javascript:;" @click="goList(item.path,item.name)">{{item.name}}</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="fileShow">
        <div v-for="(item,index) in fileList" :key="index" :class="{'fileItem':true,'selectItem':item.path==selectItem.path}" @click="select(item)" @dblclick="item.isDirectory?getList(item.path,item.name):''">
          <div :class="{'el-icon-folder':item.isDirectory,'el-icon-document':!item.isDirectory}"></div>
          <div class="title">{{item.name}}</div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="$listeners.cancel">取 消</el-button>
      <el-button size="mini" type="primary" @click="$listeners.ensure(selectItem)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  inheritAttrs:false,
  data(){
    return {
      path:[],
      selectItem:{},
      fileList:[],
    }
  },
  created(){
    this.getDisk()
  },
  methods:{
    // 获取系统根目录【Windows对应盘符，Linux对应根目录】
    getDisk(){
      this.path=[]
      this.selectItem={}
      this.$http({
        url: this.$api.apiFileOperationRootList,
        method: 'GET'
      }).then((r) => {
        if(r.code=='0'){
          this.fileList=[]
          r.data.forEach(item=>{
            this.fileList.push({
              path:item,
              name:item,
              isDirectory:true
            })
          })
        }
      })
    },
    // 选中文件
    select(item){
      this.selectItem={
        path:item.path,
        name:item.name,
        isDirectory:item.isDirectory
      }
    },
    // 获取当前目录下的文件列表
    getList(path,name){
      this.$http({
        url: this.$api.apiFileOperationFileList,
        method: 'POST',
        data:{
          path:path
        }
      }).then((r) => {
        if(r.code=='0'){
          this.path.push({
            path:path,
            name:name
          })
          this.selectItem={}
          this.fileList=[]
          r.data.forEach(item=>{
            this.fileList.push({
              path:item.path,
              name:item.name,
              isDirectory:item.isDirectory
            })
          })
        }
      })
    },
    // 面包屑跳转
    goList(path,name){
      for(let i=this.path.length-1;i>=0;i--){
        if(this.path[i].path!==path){
          this.path.pop()
        }else{
          break
        }
      }
      this.$http({
        url: this.$api.apiFileOperationFileList,
        method: 'POST',
        data:{
          path:path
        }
      }).then((r) => {
        if(r.code=='0'){
          this.fileList=[]
          r.data.forEach(item=>{
            this.fileList.push({
              path:item.path,
              name:item.name,
              isDirectory:item.isDirectory
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.fileList{
  /deep/ .el-dialog{
    /deep/ .el-dialog__header{
      border-bottom: 1px solid #ddd;
    }
    /deep/ .el-dialog__footer{
      border-top: 1px solid #ddd;
    }
    /deep/ .el-dialog__body{
      padding:0px 20px 10px;
    }
    .listContent{
      height: 300px;
      width:100%;
      overflow: hidden;
      .topTitle{
        .el-breadcrumb{
          height: 35px;
          line-height: 35px;
          border-bottom: 1px solid #ddd;
          display: flex;
          white-space: nowrap;
          overflow-x: scroll;
          /deep/ .el-breadcrumb__item{
            float: none;
          }
        }
        .el-breadcrumb::-webkit-scrollbar{
          width: 4px;
          height: 4px;
        }
        .el-breadcrumb::-webkit-scrollbar-track  
        {  
          border-radius: 5px;  
          background-color:#FFFFFF; 
        }
        .el-breadcrumb::-webkit-scrollbar-thumb  
        {  
          border-radius: 5px;  
          background-color: #bbb;
        }
      }
      .fileShow{
        display: flex;
        margin-top: 5px;
        height: 259px;
        overflow-y: auto;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        .fileItem{
          box-sizing: border-box;
          width:132px;
          text-align: center;
          .el-icon-folder{
            font-size: 80px;
          }
          .el-icon-document{
            font-size: 80px;
          }
          .title{
            margin-left:10px;
            margin-right:10px;
          }
        }
        .fileItem:hover{
          cursor: pointer;
        }
        .selectItem{
          border:1px solid #eee;
          background-color: #CCE8FF;
        }
      }
      .fileShow::-webkit-scrollbar{
        width: 6px;
        height: 6px;
      }
      .fileShow::-webkit-scrollbar-track  
      {  
        border-radius: 5px;  
        background-color:#FFFFFF; 
      }
      .fileShow::-webkit-scrollbar-thumb  
      {  
        border-radius: 5px;  
        background-color: #bbb;
      }
    }
  }
}
</style>