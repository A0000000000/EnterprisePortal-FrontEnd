import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    role: null
  },
  getters: {
    getToken(state) {
      return state.token
    },
    getRole(state) {
      return state.role
    },
  },
  mutations: {
    setToken(state, params) {
      state.token = params.token
      state.role = params.role
    }
  },
  actions: {},
  modules: {},
});
