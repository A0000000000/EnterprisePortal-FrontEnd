import Vue from 'vue'
import App from './App.vue'
import router from './router'
import showdown from 'showdown'
import store from './store'
import Fegin from './fegin'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.prototype.ip = '127.0.0.1'

Vue.prototype.axios = new Fegin(`http://${Vue.prototype.ip}:8000`)
Vue.prototype.showdown = new showdown.Converter()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
