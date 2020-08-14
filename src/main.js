import Vue from 'vue'
import axios from 'axios'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control


// set ElementUI lang to EN
Vue.use(ElementUI, {
  locale
})

Vue.config.productionTip = false

Vue.prototype.$baseURL1 = 'http://192.168.1.102:80/'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
