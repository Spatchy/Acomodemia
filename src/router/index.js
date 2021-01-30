import Vue from 'vue'
import VueRouter from 'vue-router'
// import all views here
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Settings from '../views/Settings.vue'
import Complete from '../views/Complete.vue'
import Matching from '../views/Matching.vue'
import Verify from '../views/Verify.vue'
import Chat from '../views/Chat.vue'

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
  },
  {
    path: '/verify',
    name: 'Verify',
    component: Verify
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    props: {
      name: "Harry", // hard coded for now
      matchingID: "2d07d343a0d041c9967679905b1fa71e"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
