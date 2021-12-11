import Vue from 'vue'
import Router from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Success from '../views/Success.vue'
import ChangePwd from '../views/ChangePwd.vue'
import container from '../components/container.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
    {
      path: '/container',
      name: 'container',
      component: container
    }
  ]
})
