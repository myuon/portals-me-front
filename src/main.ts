import Vue from "vue";
import Buefy from "buefy";
import router from "./router";
import App from "./App.vue";
import store from "@/store";
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
const GAuth = require("vue-google-oauth2").default;
import Vuex from "vuex";

Vue.use(Vuex);
Vue.use(Buefy);
Vue.use(GAuth, {
  clientId:
    "670077302427-0r21asrffhmuhkvfq10qa8kj86cslojn.apps.googleusercontent.com"
});

Amplify.configure({
  aws_project_region: "ap-northeast-1",
  aws_appsync_graphqlEndpoint: process.env.VUE_APP_GRAPHQL_API,
  aws_appsync_region: "ap-northeast-1",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: process.env.VUE_APP_GRAPHQL_KEY
});

Amplify.configure({
  API: {
    graphql_headers: async () => {
      const token = localStorage.getItem("id_token");

      return {
        Authorization: `Bearer ${token}`
      };
    }
  }
});

Vue.use(AmplifyPlugin, AmplifyModules);

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
