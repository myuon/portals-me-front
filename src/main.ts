import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router'
import App from './App.vue'
import store from '@/store'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'
const vueConfig = require('vue-config');
const GAuth = require('vue-google-oauth2').default;

let keys;
let key = process.env.VUE_APP_TWITTER_KEY || '.';
try {
  keys = require('../../token/auth.json');
  key = keys.twitter;
} catch (e) {
  console.log(e);
}

Vue.use(Vuetify);
Vue.use(vueConfig, {
  API: process.env.API_ENDPOINT,
  isDev: process.env.NODE_ENV === 'development',
  providers: {
    auth: {
      twitter: {
        clientId: key.split('.')[0],
        clientSecret: key.split('.')[1],
      }
    }
  },
});

Vue.use(GAuth, {
  clientId: (keys && keys.google) || process.env.VUE_APP_GOOGLE_KEY,
});

Amplify.configure(awsconfig);
Amplify.configure({
  API: {
    graphql_headers: async () => {
      const token = localStorage.getItem('id_token');

      return {
        'Authorization': `Bearer ${token}`
      };
    }
  }
});

Vue.use(AmplifyPlugin, AmplifyModules);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');
