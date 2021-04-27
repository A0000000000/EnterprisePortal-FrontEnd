import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Fegin from './fegin'

Vue.config.productionTip = false
Vue.prototype.axios = new Fegin('http://localhost:8000')


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
