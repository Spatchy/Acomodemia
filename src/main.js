import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import axios from 'axios';
import store from './store';
import VueMobileDetection from 'vue-mobile-detection';
require('./assets/styles.scss');

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
axios.defaults.headers.common.Authorization = `Bearer ${store.state.token}`;

Vue.use(VueMobileDetection);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
