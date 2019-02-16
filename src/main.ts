import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router'
import App from './App.vue'
import store from '@/store'
const vueConfig = require('vue-config');

const isDev = process.env.NODE_ENV === 'development';

Vue.use(Vuetify);
Vue.use(vueConfig, {
  API: process.env.API_ENDPOINT,
  isDev,
  providers: process.env.AUTH_TOKEN ? JSON.parse(process.env.AUTH_TOKEN) : require('../../token/auth.json'),
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');