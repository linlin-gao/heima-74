import Vue from 'vue'
import App from './App.vue'

import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router'

import axios from '@/api/axios'
Vue.prototype.$http = axios

Vue.use(ELEMENT)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
