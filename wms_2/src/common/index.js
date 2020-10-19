import dataArea from './dataArea.js'
import funcData from './funcData.js'
import delimitStr from '@/common/v-delimitStr'

export default {
  install(Vue){
    Vue.use(delimitStr)
  },
  dataArea: dataArea.area,
  funcData
}