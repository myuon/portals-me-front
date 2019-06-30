<template>
  <div class="container">
    <amplify-connect :query="getUser">
      <template slot-scope="{loading, data, errors}">
        <template v-if="loading">loading...</template>
        <template v-if="errors.length > 0">{{ errors }}</template>
        <user-profile :user="data.getUserByName" v-if="data.getUserByName"/>
      </template>
    </amplify-connect>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import sdk from "../app/sdk";
import * as API from "../API";
import * as queries from "../graphql/queries";
import UserProfile from "./user/UserProfile.vue";

export interface User {
  id: string;
}

export default Vue.extend({
  components: {
    UserProfile
  },

  data() {
    return {
      user: null as User | null,
      feed: [],
      me: JSON.parse(localStorage.getItem("user")),
      editDialog: false
    };
  },

  computed: {
    getUser() {
      return this.$Amplify.graphqlOperation(queries.getUserByName, {
        name: this.$route.params.name
      });
    }
  },

  methods: {}
});
</script>
