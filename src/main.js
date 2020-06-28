import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import http from '../http'
import Vant from 'vant'
import { Toast } from 'vant';
import './assets/iconfont/iconfont.css'

Vue.prototype.$msg = Toast
Vue.prototype.$http = http
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
