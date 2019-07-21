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
          <edit-user-profile :user="user" @submit="submit" />
        </div>
      </b-collapse>

      <b-button @click="follow" v-if="user.id != me.id && !user.is_following">このユーザーをフォロー</b-button>

      <p>フォロー {{ user.followings }} / フォロワー {{ user.followers }}</p>

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
import * as mutations from "../../graphql/mutations";
import * as queries_extra from "../../graphql/queries_extra";
import * as APITypes from "../../API";
import EditUserProfile from "./EditUserProfile.vue";
import axios from "axios";
import { API, graphqlOperation } from "aws-amplify";

export default Vue.extend({
  props: ["user"],

  components: {
    ListPost,
    EditUserProfile
  },

  computed: {
    listPostSummary() {
      return this.$Amplify.graphqlOperation(queries_extra.ListPostSummary, {
        owner: this.$props.user.id
      });
    }
  },

  data() {
    return {
      me: JSON.parse(localStorage.getItem("user")),
      editDialog: false
    };
  },

  methods: {
    async follow() {
      const result = await API.graphql(
        graphqlOperation(mutations.followUser, {
          targetId: this.user.id
        })
      );

      console.log(JSON.stringify(result));
      location.reload();
    },

    async submit(form) {
      const token = localStorage.getItem("id_token");

      await axios.put(`${process.env.VUE_APP_AUTH_API_ENDPOINT}/self`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      this.$emit("submitted");
      this.$snackbar.open(
        "プロフィールが更新されました。反映には時間がかかります。"
      );
    }
  }
});
</script>

