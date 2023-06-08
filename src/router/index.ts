import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ManagementTaskView from '../views/ManagementTaskView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/management',
    name: 'management',
    component: ManagementTaskView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  let autenticated = false
  let user = localStorage.getItem('user_task')

  if (user !== null) {
    autenticated = true
  }

  if (!autenticated) {
    if (to.name !== 'login') {
      next('/login')
    }else{
      next()
    }
  }else{
    next()
  }

})

export default router
