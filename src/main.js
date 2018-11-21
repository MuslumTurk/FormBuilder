// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Resource from 'vue-resource';
import NProgress from 'vue-nprogress';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Resource);
Vue.use(NProgress);

// Enable devtools
Vue.config.devtools = true;

sync(store, router);

const nprogress = new NProgress({ parent: '.nprogress-container' });

const app = new Vue({
  router,
  store,
  nprogress,
  ...App
});

export { app, router, store };
