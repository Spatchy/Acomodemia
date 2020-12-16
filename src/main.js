import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false
axios.defaults.withCredentials = true
axios.defaults.headers.common.Authorization = `Bearer ${store.state.token}`

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
