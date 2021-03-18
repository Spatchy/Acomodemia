// orginally obtained from: https://webdeasy.de/en/complete-login-system-with-node-js-vue-js-vuex-part-2-2/

import axios from 'axios';
// import { response } from 'express';
const url = 'api/';
export default {
  login(credentials) {
    return axios
        .post(url + 'login/', credentials)
        .then((response) => response.data);
  },
  signUp(credentials) {
    return axios
        .post(url + 'sign-up/', credentials)
        .then((response) => response.data);
  },
  settings(info) {
    return axios
        .post(url + 'settings/', info)
        .then((response) => response.data);
  },
  retrieveSportsData() {
    return axios
        .post(url + 'sportsData/')
        .then((response) => response.data);
  },
  retrieveOaData() {
    return axios
        .post(url + 'oaData/')
        .then((response) => response.data);
  },
  retrieveIndoorData() {
    return axios
        .post(url + 'indoorData/')
        .then((response) => response.data);
  },
  retrieveMusicData() {
    return axios
        .post(url + 'musicData/')
        .then((response) => response.data);
  },

  fileUpload(credentials) {
    return axios
        .post(url + 'fileUpload/', credentials)
        .then((response) => response.data);
  },

  dropdown(credentials) {
    return axios
        .post(url + 'interests/', credentials)
        .then((response) => response.data);
  },

  getSecretContent() {
    return axios.get(url + 'secret-route/').then((response) => response.data);
  },

  confirm(credentials) {
    return axios
        .post(url + 'confirm/', credentials)
        .then((response) => response.data);
  },

  getDetails() {
    return axios
        .post(url + 'details/')
        .then((response) => response.data);
  },

  getProfilePic() {
    return axios({url: url + 'getProfilePic/', method: 'GET', responseType: 'arraybuffer'})
        .then((response) => response.data);
  },

  getFeed(credentials) {
    return axios
        .post(url + 'getFeed/', credentials)
        .then((response) => response.data);
  },

  requestMatch(credentials) {
    return axios
        .post(url + 'requestMatch/', credentials)
        .then((response) => response.data);
  },
  reject(credentials) {
    return axios
        .post(url + 'reject/', credentials)
        .then((response) => response.data);
  },
  getMatches() {
    return axios
        .post(url + 'getMatches/')
        .then((response) => response.data);
  },

  checkVerified() {
    return axios
        .post(url + 'verfication-check/')
        .then((response) => response.data);
  },
  postMessage(credentials) {
    return axios
        .post(url + 'postMessage/', credentials)
        .then((response) => response.data);
  },
  getMatchByID(id) {
    return axios
        .post(url + 'getMatchByID/', id)
        .then((response) => response.data);
  },
  getChatHistory(id) {
    return axios
        .post(url + 'getChatHistory/', id)
        .then((response) => response.data);
  },
  getChatMostRecent(id) {
    return axios
        .post(url + 'getChatMostRecent/', id)
        .then((response) => response.data);
  },
  resetPassword(credentials) {
    return axios
        .post(url + 'resetPassword/', credentials)
        .then((response) => response.data);
  },
  forgotPassword(credentials) {
    return axios
        .post(url + 'forgotPassword/', credentials)
        .then((response) => response.data);
  },
  changeEmail(credentials) {
    return axios
        .post(url + 'changeEmail/', credentials)
        .then((response) => response.data);
  },
  getInterests() {
    return axios
        .get(url+ 'getInterests/')
        .then((response) => response.data);
  },
  deleteAccount() {
    return axios
        .post(url + 'deleteAccount/')
        .then((response) => response.data);
  },
  getNewMatchesByTimestamp(timestamp) {
    return axios
        .post(url + 'getNewMatchesByTimestamp/', timestamp)
        .then((response) => response.data);
  },
  unmatch(credentials) {
    return axios
        .post(url + 'reject/', credentials)
        .then((response) => response.data);
  },
};
