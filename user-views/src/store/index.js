import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    role: null,
    cart: {
      goods: [],
      coupon: null,
      location: {
        type: null,
        id: null,
        name: null,
        details: null
      }
    }
  },
  getters: {
    getToken(state) {
      return state.token
    },
    getRole(state) {
      return state.role
    },
    getCart(state) {
      return state.cart
    }
  },
  mutations: {
    setToken(state, params) {
      state.token = params.token
      state.role = params.role
    },
    addGoodToCart(state, id) {
      state.cart.goods.push(id)
    },
    deleteGoodFromCart(state, id) {
      state.cart.goods = state.cart.goods.filter(item => item !== id)
    },
    setCoupon(state, id) {
      state.cart.coupon = id
    },
    setLocation(state, params) {
      if (params.type === 'USE_OLD') {
        state.cart.location.type = params.type
        state.cart.location.id = params.id
      } else {
        state.cart.location.type = params.type
        state.cart.location.name = params.name
        state.cart.location.details = params.details
      }
    },
    clearCart(state) {
      state.cart = {
        goods: [],
        coupon: null,
        location: {
          type: null,
          id: null,
          name: null,
          details: null
        }
      }
    }
  },
  actions: {
  },
  modules: {
    setToken(state, token) {
      state.token = token
    }
  }
})
