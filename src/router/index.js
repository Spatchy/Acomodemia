import Vue from 'vue'
import VueRouter from 'vue-router'
// import all views here
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Settings from '../views/Settings.vue'
import Complete from '../views/Complete.vue'
import Matching from '../views/Matching.vue'

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
  {
    path: '/feed',
    name: 'Matching',
    component: Matching
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
