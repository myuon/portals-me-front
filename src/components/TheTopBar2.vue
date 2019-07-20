<template>
  <div>
    <nav
      class="navbar"
      :class="{ 'is-primary': authenticated }"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <div class="navbar-item brand-title">
          <router-link
            :to="authenticated ? '/dashboard' : '/'"
            :style="authenticated ? { color: '#fff' } : {}"
          >Portals@me</router-link>
        </div>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item" v-if="isDev">
            <span class="tag is-danger">development</span>
          </div>
          <div class="navbar-item has-dropdown is-hoverable" :v-if="authenticated">
            <a class="navbar-link" v-if="user">
              <figure class="image is-32x32">
                <img class="is-rounded" :src="user.picture" />
              </figure>
              {{ user.display_name }}
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item" @click="$router.push(`/users/${user.name}`)">プロフィール</a>
              <a class="navbar-item" @click="signOut">サインアウト</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "../views/User.vue";
import * as jwt from "../lib/jwt";

export default Vue.extend({
  data() {
    return {
      user: null as User | null,
      token: null
    };
  },

  computed: {
    isDev() {
      return process.env.NODE_ENV === "development";
    },

    authenticated() {
      console.log(!!this.token && jwt.validateExp(this.token));

      return !!this.token && jwt.validateExp(this.token);
    }
  },

  methods: {
    async signOut() {
      localStorage.setItem("id_token", "");
      localStorage.setItem("user", "{}");
      this.user = null;
      this.$router.push("/");
    },
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    }
  },

  async mounted() {
    const token = localStorage.getItem("id_token");
    if (!token) return;

    this.token = localStorage.getItem("id_token");

    try {
      this.user = JSON.parse(localStorage.getItem("user") || "");
    } catch (e) {
      console.error(e);
      this.user = null;
    }

    const needAuth = (str: string) => str.match(/^\/collections\/(.*)/);

    if (!this.user && !needAuth(this.$route.path)) {
      this.$router.push("/");
    }
  }
});
</script>

