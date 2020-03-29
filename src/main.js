import Vue from 'vue'
import 'axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueCookies from 'vue-cookies'
import VueApexCharts from 'vue-apexcharts'
Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');
