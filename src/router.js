import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Reset from './views/ResetPassword.vue'
import Admin from './views/AdminPanel.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reset',
      name: 'reset',
      component: Reset
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ],
  mode: 'history'
})
