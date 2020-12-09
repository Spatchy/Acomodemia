// orginally obtained from: https://webdeasy.de/en/complete-login-system-with-node-js-vue-js-vuex-part-2-2/

import axios from 'axios';
//import { response } from 'express';
const url = 'api/';
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
  retrieveSportsData(){
    return axios
      .post(url + 'sportsData/')
      .then(response => response.data);
  },
  retrieveOaData(){
    return axios
      .post(url + 'oaData/')
      .then(response => response.data);
  },
  retrieveIndoorData(){
    return axios
      .post(url + 'indoorData/')
      .then(response => response.data);
  },
  retrieveMusicData(){
    return axios
      .post(url + 'musicData/')
      .then(response => response.data);
  },
  fileUpload() {
    return axios
    .post(url + 'fileUpload/')
    .then(response => response.data)
  },
  dropdown() {
    return axios
    .post(url + 'interests/')
    .then(response => response.data)
  },

  getSecretContent() {
    return axios.get(url + 'secret-route/').then(response => response.data);
  },
  confirm(credentials) {
    return axios
      .post(url +'confirm/', credentials)
      .then(response => response.data);
  }
};