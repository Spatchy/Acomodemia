import Vue from 'vue'
import VueRouter from 'vue-router'
// import all views here
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Settings from '../views/Settings.vue'
import Complete from '../views/Complete.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/complete',
    name: 'Complete',
    component: Complete
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
