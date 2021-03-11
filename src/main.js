import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import less from 'less'
import "element-ui/lib/theme-chalk/index.css"
import 'mavon-editor/dist/css/index.css'
import "./axios"
import "./permission"
import animated from 'animate.css'
import loginCheck from './js/loginCheck'
import vueLive from 'vue-live2d'
Vue.use(vueLive)
//检测是否登录状态。没登陆跳转登录
Vue.prototype.checkLogin = loginCheck
Vue.use(animated)
Vue.use(Element)
Vue.use(mavonEditor)
Vue.use(less)
Vue.config.productionTip = false
Vue.prototype.$axios = axios //
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
