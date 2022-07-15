import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router';
Vue.use(VueRouter as any)
import HomePage from '@/components/HomePage.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '*',
    redirect:'/'
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router
