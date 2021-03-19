import Vue from 'vue';
import VueRouter from 'vue-router';
// import all views here
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import Settings from '../views/Settings.vue';
import Matching from '../views/Matching.vue';
import Verify from '../views/Verify.vue';
import Chat from '../views/Chat.vue';
import Logout from '../views/Logout.vue';
import Forgot from '../views/Forgot.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'Login',
  component: Login,
},
{
  path: '/sign-up',
  name: 'Sign-up',
  component: SignUp,
},
{
  path: '/settings',
  name: 'Settings',
  component: Settings,
  alias: '/complete',
},
{
  path: '/feed',
  name: 'Matching',
  component: Matching,
},
{
  path: '/verify',
  name: 'Verify',
  component: Verify,
},
{
  path: '/chat',
  name: 'Chat',
  component: Chat,
  props: (route) => ({matchingID: `${route.query.to}`}),
},
{
  path: '/logout',
  name: 'Logout',
  component: Logout,
},
{
  path: '/forgot',
  name: 'Forgot',
  component: Forgot,
},
{
  path: '/matches',
  redirect: {
    name: 'Matching',
  },
},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
