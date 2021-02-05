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

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/sign-up',
        name: 'Sign-up',
        component: SignUp
    },
    {
        path: '/settings',
        name: 'Settings',
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
        props: route => ({ matchingID: `${route.query.to}` })


    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router