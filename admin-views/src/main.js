import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue';

import showdown from 'showdown'
import Fegin from './fegin'

import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);

Vue.config.productionTip = false
Vue.prototype.ip = '127.0.0.1'

Vue.prototype.axios = new Fegin(`http://${Vue.prototype.ip}:8000`)
Vue.prototype.showdown = new showdown.Converter()


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
