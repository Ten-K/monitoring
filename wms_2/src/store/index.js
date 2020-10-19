import Vue from 'vue'
import Vuex from 'vuex'

import moduleTest from '@/store/modules/test'
import moduleLoading from '@/store/modules/loading'


Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    testWord: '测试vuex'
  },
  modules: {
    moduleTest,
    moduleLoading
  }
})

export default store