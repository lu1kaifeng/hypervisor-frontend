import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from '@/plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueCookies from 'vue-cookies'
Vue.config.productionTip = false
Vue.use(VueCookies)
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
