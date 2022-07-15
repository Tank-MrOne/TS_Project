import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router';
Vue.use(VueRouter as any)
import HomePage from '@/components/HomePage.vue'
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  // {
  //   path: '/loveFund/*',
  //   redirect:'/loveFund'
  // },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router
