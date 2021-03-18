// orginally obtained from: https://webdeasy.de/en/complete-login-system-with-node-js-vue-js-vuex-part-2-2/

import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);
const getDefaultState = () => {
  return {
    token: '',
    user: {},
    verified: false, // added
  };
};
export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isLoggedIn: (state) => {
      return state.token;
    },
    getUser: (state) => {
      return state.user;
    },
    isVerified: (state) => { // only for UX purposes, verification still checked server side on all requests
      return state.verified;
    },
    getEssential: (state) => {
      return state.essentialSettingsComplete;
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_VERIFIED: (state) => {
      state.verified = true;
    },
    SET_ESSENTIAL: (state) => {
      state.user.EssentialSettingsComplete = true;
    },
    RESET: (state) => {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    login: ({commit, dispatch}, {token, user}) => {
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
      // set auth header
      Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    verify: ({commit}) => {
      commit('SET_VERIFIED', '');
    },
    logout: ({commit}) => {
      commit('RESET', '');
    },
    essential: ({commit}) => {
      commit('SET_ESSENTIAL', '');
    },
  },
});
