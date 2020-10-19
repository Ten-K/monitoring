<template>
  <div id="test">
    测试请求
    <button @click="testGet">Get请求</button>
    <button @click="testPost">POST请求</button>
  </div>
</template>
<script>
export default {
  methods: {
    testGet(){
      this.$http({
        url: this.$api.testGet,
        method: 'GET',
      }).then((r) => {
        if (r.code === '0') {
          console.log('GET ->')
          console.log(r)
        }
      })
    },
    testPost(){
      this.$http({
        url: this.$api.testPost,
        method: 'POST',
        data: {
          detail: '详情'
        }
      }).then((r) => {
        if (r.code === '0') {
          console.log('POST ->')
          console.log(r)
        }
      })
    }
  }
}
</script>