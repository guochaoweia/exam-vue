import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles.scss'
import './common.scss'
import VueSocketIO from 'vue-socket.io'
import "@/components/main.js"
import Cache from "@/assets/utils/cache";

Vue.use(ElementUI)

Vue.use(new VueSocketIO({
  debug: true,
  // connection: 'http://8.131.89.181:7001',    //这个地址是服务端地址
  connection: 'http://192.168.0.127:7001',    //这个地址是服务端地址
}))
Vue.config.productionTip = false
Vue.prototype.$bus = new Cache()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
