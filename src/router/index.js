import Vue from 'vue'
import Router from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Success from '../views/Success.vue'
import ChangePwd from '../views/ChangePwd.vue'
import container from '../views/container.vue'

Vue.use(Router)

//router 3.0以上版本 会出现重复点击菜单导航出现报错 以下解决
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/container',
      name: 'container',
      component: container,
      redirect: '/container/Interview',
      children: [
        {
          path: '/container/Interview',
          name: 'Interview',
          component: ()=>import('../views/Interview/Interview.vue')
        },
        {
          path: '/container/personnel',
          name: 'Personnel',
          component: ()=>import('../views/Personnel/Personnel.vue')
        },
        {
          path: '/container/finance',
          name: 'finance',
          component: ()=>import('../views/Finance/finance.vue')
        },
        {
          path: '/container/staff',
          name: 'staff',
          component: ()=>import('../views/Finance/staff.vue')
        },
        {
          path: '/container/railway',
          name: 'Railway',
          component: ()=>import('../views/Railway/Railway.vue')
        },
        {
          path: '/container/visitor',
          name: 'Visitor',
          component: ()=>import('../views/Visitor/Visitor.vue')
        },
        {
          path: '/container/scan',
          name: 'scan',
          component: ()=>import('../views/Data_Scanning/scan.vue')
        },
        {
          path: '/container/input',
          name: 'input',
          component: ()=>import('../views/Data_Scanning/input.vue')
        },
        {
          path: '/PersonalCenter',
          name: 'PersonalCenter',
          component: ()=>import('../views/PersonalCenter.vue')
        }
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
  ],
})
