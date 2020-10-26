<template>
  <div id="softwareDetail">
    <BaseSearchCom 
      :comData="comData"
      :formLabel="searchLabels"
      :getData="getList"
    />
    <BaseTableCom
      :tableData="tableData"
      :tableHeader="tableLabels"
      :getTableData="getList"
      :totalItems="totalItems"
      :comData="comData"
      :hasOperationBtn="true">
      <template v-slot:operationBtn="data">
        <el-button type="text" @click="downloadFile(data)">下载文件</el-button>
      </template>
    </BaseTableCom>
  </div>
</template>
<script>
export default {
  data(){
    return {
      comData: {
        id: 'softwareDetail'
      },
      searchLabels: [{
        type: 'input',
        prop: 'protocol',
        label: '协议类型'
      },{
        type: 'input',
        prop: 'targetIp',
        label: '目标IP'
      },{
        type: 'input',
        prop: 'sensitiveDataField',
        label: '敏感数据'
      },{
        type: 'datePicker',
        prop: 'operatingTime',
        label: '操作时间',
        itemType: 'datetime',
        format: 'yyyy-MM-dd HH:mm:ss'
      }],
      tableLabels: [{
        type: 'timestamp',
        prop: 'timestamp',
        columnOperable: 'none',
        label: '访问时间'
      },{
        type: 'word',
        prop: 'targetIp',
        label: '目的IP地址'
      },{
        type: 'word',
        prop: 'protocol',
        label: '协议类型'
      },{
        type: 'word',
        prop: 'sensitiveDataField',
        label: '敏感数据字段'
      },{
        type: 'word',
        prop: 'bytes',
        label: '网络流量'
      }],
      tableData: [],
      totalItems: 0
    }
  },
  methods: {
    getList(params){
      params.data.type = 1;
      params.data.name = this.$route.params.exeName;
      this.$http({
        url: this.$api.apiSoftwareDetailList,
        method: 'POST',
        data: params
      }).then((r) => {
        if (r.code === '0') {
          console.log('POST ->')
          console.log(r)
          this.tableData = r.data;
          this.totalItems = r.totalItems;
        }
      })
    },
    downloadFile(data){
      let href = `${window.location.origin}/${this.$api.apiFileDownload}?pid=${data.scope.row.pid}&fileName=${data.scope.row.fd}`;
      let aElement = document.createElement('a');
      aElement.href = href;
      aElement.download = data.scope.row.fd;
      aElement.click();
    }
  }
}
</script>