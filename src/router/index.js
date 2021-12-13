import Vue from 'vue'
import Router from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Success from '../views/Success.vue'
import ChangePwd from '../views/ChangePwd.vue'
import container from '../views/container.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/container',
      name: 'container',
      component: container,
      redirect: 'data_all',
      children: [
        {
          path: '/data_all',
          name: 'Data_All',
          component: ()=>import('../views/Data_All/Data.vue')
        },
        {
          path: '/personnel',
          name: 'Personnel',
          component: ()=>import('../views/Personnel/Personnel.vue')
        },
        {
          path: '/finance',
          name: 'Finance',
          component: ()=>import('../views/Finance/Finance.vue')
        },
        {
          path: '/railway',
          name: 'Railway',
          component: ()=>import('../views/Railway/Railway.vue')
        },
        {
          path: '/visitor',
          name: 'Visitor',
          component: ()=>import('../views/Visitor/Visitor.vue')
        },
        // {
        //   path: '/scan',
        //   name: 'scan',
        //   component: ()=>import('../views/Data_Scanning/scan.vue')
        // },
        // {
        //   path: '/input',
        //   name: 'input',
        //   component: ()=>import('../views/Data_Scanning/input.vue')
        // }
      ]
    },
    {
      path: '/',
      name: '登录',
      component: Login
    },
    {
      path: '/Register',
      name: '注册',
      component: Register
    },
    {
      path: '/Success',
      name: '登录成功',
      component: Success
    },
    {
      path: '/ChangePwd',
      name: '修改密码',
      component: ChangePwd
    },
    // {
    //   path: '/container',
    //   name: 'container',
    //   component: container
    // }
  ],
})
