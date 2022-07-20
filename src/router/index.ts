import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router';
Vue.use(VueRouter as any)
import HomePage from '@/views/HomePage.vue'
import Collection from '@/views/Collection.vue'
import UserInfo from '@/views/UserInfo.vue'
import Detail from '@/views/Detail.vue'
import Login from '@/views/Login.vue'
import Social from '@/views/Social.vue'

// vuex
import store from '@/store/index'

const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/collection',
    name: 'collection',
    component: Collection,
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: UserInfo,
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/social',
    name: 'social',
    component: Social,
  },
  {
    path: '*',
    redirect: '/home'
  },
];

const router = new VueRouter({
  // mode: 'hash',
  routes,
});
router.beforeEach((to: any, from: any, next: any) => {
  // to and from are both route objects. must call `next`.
  const release = ['/login', '/home', '/collection']
  if (release.includes(to.path) || store.state.isLogin || sessionStorage.getItem('yongle')) {
    next()
  } else {
    next('/login')
  }
})

export default router
