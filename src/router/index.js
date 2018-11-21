import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  name: 'router',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: require('../views/')
    }
  ]
});
