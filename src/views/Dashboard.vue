<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <div class="box">
        <create-post />
      </div>

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
import CreatePost from "./dashboard/CreatePost.vue";
import ListPost from "./dashboard/ListPost.vue";
import * as queries from "../graphql/queries";

export default Vue.extend({
  components: {
    CreatePost,
    ListPost
  },

  computed: {
    listPostSummary() {
      return this.$Amplify
        .graphqlOperation(`query ListPostSummary($owner: String) {
  listPostSummary(owner: $owner) {
    id
    title
    description
    updated_at
    created_at
    entity_type
    entity {
      ... on Share {
        format
        url
      }
      ... on Images {
        images {
          filetype
          s3path
        }
      }
    }
    owner
    owner_user {
      id
      name
      picture
      display_name
    }
  }
}
`);
    }
  }
});
</script>

