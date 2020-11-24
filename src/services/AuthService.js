// orginally obtained from: https://webdeasy.de/en/complete-login-system-with-node-js-vue-js-vuex-part-2-2/

import axios from 'axios';
//import { response } from 'express';
const url = 'http://localhost:8080/api/';
export default {
  login(credentials) {
    return axios
      .post(url + 'login/', credentials)
      .then(response => response.data);
  },
  signUp(credentials) {
    return axios
      .post(url + 'sign-up/', credentials)
      .then(response => response.data);
  },
  settings(info) {
    return axios  
      .post(url + 'settings/', info)
      .then(response => response.data);
  },
  getSecretContent() {
    return axios.get(url + 'secret-route/').then(response => response.data);
  }
};