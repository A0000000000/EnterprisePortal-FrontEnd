import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: null
  },
  getters: {
    getMessage: (state) => {
      return state.message
    }
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    }
  },
  actions: {
    requestMessage(context, { callback }) {
      this._vm.$axios.get('/hello').then(res => {
        let data = res.data
        context.commit('setMessage', data.message)
        callback(data)
      })
    }
  },
  modules: {
  }
})