import Vue from 'vue'
import router from './router';
import "@/styles/reset.scss"
import App from '@/App.vue'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app');

