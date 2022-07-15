import Vue from 'vue'
import router from './router';
import store from '@/store'
import "@/styles/reset.scss"
import App from '@/App.vue'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h: any) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app');

