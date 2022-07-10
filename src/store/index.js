import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getUserInfo } from "../api/api";

export default new Vuex.Store({
  state: {
    userinfo: {}
  },
  getters: {
  },
  mutations: {
    userinfo: (state, pay) => {
      state.userinfo = pay
      console.log(state);
      console.log(pay);
    }
  },
  actions: {
    getUserInfoApi() {
      return getUserInfo()
    }
  },
  modules: {
  }
})
