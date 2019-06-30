import Vue from "vue";
import Router from "vue-router";

import SideBar from "@/components/TheSideBar.vue";
import UnsignedTopBar from "@/components/TheUnsignedTopBar.vue";
import TopBar from "@/components/TheTopBar.vue";

import Landing from "@/views/Landing.vue";
import Dashboard from "@/views/Dashboard.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import User from "@/views/User.vue";
import PasswordForm from "@/views/PasswordForm.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      components: {
        default: Landing,
        topbar: UnsignedTopBar
      }
    },
    {
      path: "/signup",
      name: "signup",
      components: {
        default: SignUp,
        topbar: UnsignedTopBar
      }
    },
    {
      path: "/signup/twitter-callback",
      name: "signup-twitter-callback",
      components: {
        default: SignUp,
        topbar: UnsignedTopBar
      }
    },
    {
      path: "/signin",
      name: "signin",
      components: {
        default: SignIn,
        topbar: UnsignedTopBar
      }
    },
    {
      path: "/signin-password",
      name: "signin-password",
      components: {
        default: PasswordForm,
        topbar: UnsignedTopBar
      }
    },
    {
      path: "/signin/twitter-callback",
      name: "signin-twitter-callback",
      components: {
        default: SignIn,
        topbar: UnsignedTopBar
      }
    },
    {
      path: "/dashboard",
      name: "home",
      components: {
        default: Dashboard,
        sidebar: SideBar,
        topbar: TopBar
      }
    },
    {
      path: "/users/:name",
      name: "user",
      components: {
        default: User,
        topbar: TopBar
      }
    }
  ]
});
