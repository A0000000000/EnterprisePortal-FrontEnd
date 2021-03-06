import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import axios from './axios/index'
import QS from 'qs'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)

Vue.prototype.$axios = axios
Vue.prototype.qs = QS

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
