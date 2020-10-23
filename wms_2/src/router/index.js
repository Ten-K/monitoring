import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import login from '@/views/login'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/login',
      component: login,
      name: 'login'
    },{
      path: '/',
      component: index,
      redirect: '/index',
      children: [{
        path: 'index',
        name: 'index'
      },{
        path: '/testRequest',
        component: () => import('@/views/testRequest'),
        name: 'testRequest'
      },{
        path: '/severityLevel',
        component: () => import('@/views/severityLevel'),
        name: 'severityLevel'
      },{
        path:'/softwareList',
        component:()=>import('@/views/softwareList'),
        name:'softwareList'
      },{
        path:'/processList',
        component:()=>import('@/views/processList'),
        name:'processList'
      }]
    }
  ]
})
