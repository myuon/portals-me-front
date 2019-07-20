import Vue from "vue";
import Router from "vue-router";

import SideBar from "@/components/TheSideBar.vue";
import UnsignedTopBar from "@/components/TheUnsignedTopBar.vue";
import TopBar from "@/components/TheTopBar2.vue";

import Landing from "@/views/Landing.vue";
import Dashboard from "@/views/Dashboard.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import User from "@/views/User.vue";
import PasswordForm from "@/views/PasswordForm.vue";

import store from "./store";

Vue.use(Router);

const requireAuth = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next("/");
  }
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      components: {
        default: Landing,
        topbar: TopBar
      }
    },
    {
      path: "/signup",
      name: "signup",
      components: {
        default: SignUp,
        topbar: TopBar
      }
    },
    {
      path: "/signup/twitter-callback",
      name: "signup-twitter-callback",
      components: {
        default: SignUp,
        topbar: TopBar
      }
    },
    {
      path: "/signin",
      name: "signin",
      components: {
        default: SignIn,
        topbar: TopBar
      }
    },
    {
      path: "/signin-password",
      name: "signin-password",
      components: {
        default: PasswordForm,
        topbar: TopBar
      }
    },
    {
      path: "/signin/twitter-callback",
      name: "signin-twitter-callback",
      components: {
        default: SignIn,
        topbar: TopBar
      }
    },
    {
      path: "/dashboard",
      name: "home",
      components: {
        default: Dashboard,
        sidebar: SideBar,
        topbar: TopBar
      },
      beforeEnter: requireAuth
    },
    {
      path: "/users/:name",
      name: "user",
      components: {
        default: User,
        topbar: TopBar
      },
      beforeEnter: requireAuth
    }
  ]
});
