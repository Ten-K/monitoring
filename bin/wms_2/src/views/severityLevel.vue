<template>
  <div id="severityLevel">
    <BaseTableCom 
      :comData="comData"
      :tableHeader="tableHeader"
      :tableData="dataList"
      :getTableData="getList"
      :hasOperationBtn="true">
      <template v-slot:headLeft>
        <el-button type="primary" size="mini" @click="dialogVisible=true">新建等级</el-button>
      </template>
      <template v-slot:operationBtn="data">
        <el-button type="text" @click="deleteSeverityLevel(data)">删除</el-button>
      </template>
    </BaseTableCom>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <BaseFormCom 
        ref="severityLevelBFC"
        :labels="formLabels" 
        :handleCompleteData="handleCompleteData"
        :handleIncompleteData="()=>{}"
        :originFormData="originFormData"
        :comData="comData"
        :isShowSumbitBtn="false">
      </BaseFormCom>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="dialogSumbit">确 定</el-button>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return {
      dataList: [],
      tableHeader: [{
        prop: 'name',
        type: 'word',
        label: '名称'
      },{
        prop: 'id',
        type: 'word',
        label: 'ID'
      }],
      comData: {
        id: 'severityLevel',
        type: 'create'
      },
      formData: {},
      formLabels: [{
        type: 'input',
        prop: 'name',
        label: '等级名称',
        required: 1
      },{
        type: 'input',
        prop: 'levelNo',
        label: '等级编号',
        required: 1
      }],
      dialogTitle: '新增严重等级',
      dialogVisible: false,
      originFormData: {},
    }
  },
  methods: {
    getList(){
      this.$http({
        url: this.$api.apiSeverityLevelGet,
        method: 'GET',
      }).then((r) => {
        if (r.code === 0) {
          this.dataList = r.data;
        }
      })
    },
    handleCompleteData(data){
      if(this.comData.type === 'create'){
        this.createSeverityLevel(data);
      }
    },
    createSeverityLevel(data){
      this.$http({
        url: this.$api.apiSeverityLevelCreate,
        method: 'POST',
        data
      }).then((r) => {
        if (r.code === 0) {
          this.dialogVisible = false;
          this.getList();
        }
      }).catch(err => {
        this.dialogVisible = false;
      })
    },
    deleteSeverityLevel(data){
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$api.apiSeverityLevelDel,
          method: 'POST',
          data: {
            id: data.scope.row.id
          }
        }).then((r) => {
          if (r.code === 0) {
            this.dialogVisible = false;
            this.getList();
          }
        }).catch(err => {
          this.dialogVisible = false;
        })
      }).catch(() => {
      });
    },
    dialogSumbit(){
      this.$refs.severityLevelBFC.handleSubmit();
    }
  }
}
</script>
<style scoped>
#severityLevel{
  height: 100%;
}
</style>