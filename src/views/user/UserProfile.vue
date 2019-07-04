<template>
  <div class="columns is-mobile">
    <div class="column is-half is-offset-one-quarter">
      <figure class="image is-128x128">
        <img class="is-rounded" :src="user.picture" />
      </figure>

      <h2>{{ user.display_name }}</h2>
      <p>@{{ user.name }}</p>

      <b-collapse :open="false" aria-id="contentIdForA11y1">
        <b-button
          type="is-primary"
          slot="trigger"
          aria-controls="contentIdForA11y1"
          v-if="user.id == me.id"
        >プロフィールを編集</b-button>
        <div class="notification">
          <edit-user-profile :user="user" />
        </div>
      </b-collapse>

      <b-button @click="follow" v-if="user.id != me.id">このユーザーをフォロー</b-button>

      <amplify-connect :query="listPostSummary">
        <template slot-scope="{ loading, data, errors }">
          <template v-if="loading">Loading...</template>
          <template v-else-if="errors.length > 0">{{ errors }}</template>
          <template v-else-if="data">
            <list-post :items="data.listPostSummary" />
          </template>
        </template>
      </amplify-connect>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ListPost from "../dashboard/ListPost.vue";
import * as queries from "../../graphql/queries";
import * as API from "../../API";
import EditUserProfile from "./EditUserProfile.vue";

export default Vue.extend({
  props: ["user"],

  components: {
    ListPost,
    EditUserProfile
  },

  computed: {
    listPostSummary() {
      const arg: API.ListPostSummaryQueryVariables = {
        owner: this.$props.user.id
      };

      return this.$Amplify.graphqlOperation(queries.listPostSummary, arg);
    }
  },

  data() {
    return {
      me: JSON.parse(localStorage.getItem("user")),
      editDialog: false
    };
  },

  methods: {
    updateUserProfile() {},
    follow() {}
  }
});
</script>

