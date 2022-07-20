import Vue from 'vue'
import router from './router';
import store from '@/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/styles/reset.scss"
import "@/styles/global.scss"
import App from '@/App.vue'

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h: any) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app');

