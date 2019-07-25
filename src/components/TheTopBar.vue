<template>
  <div id="the-topbar">
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
            <a class="navbar-link" v-if="user" data-cy="signed-user">
              <figure class="image is-32x32" style="margin-right: 0.3em;">
                <img class="is-rounded topbar-avatar" :src="user.picture" />
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

<style scoped>
.image img.topbar-avatar {
  max-height: 100%;
}
</style>


<script lang="ts">
import Vue from "vue";
import { User } from "../views/User.vue";
import * as jwt from "../lib/jwt";

export default Vue.extend({
  data() {
    return {};
  },

  computed: {
    isDev() {
      return process.env.NODE_ENV === "development";
    },

    authenticated() {
      return !!this.user;
    },

    user() {
      return this.$store.state.user;
    }
  },

  methods: {
    async signOut() {
      this.$store.dispatch("unauthenticate");
      this.$router.push("/");
    },
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    }
  },

  async mounted() {
    this.$store.dispatch("authenticate");
  }
});
</script>

