<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <div class="box">
        <create-post @reload="loadItems" />
      </div>

      <template v-if="error">{{ error }}</template>
      <template v-else-if="items.length > 0">
        <list-post :items="items" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CreatePost from "./dashboard/CreatePost.vue";
import ListPost from "./dashboard/ListPost.vue";
import * as queries from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export default Vue.extend({
  data() {
    return {
      items: [],
      error: null
    };
  },

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
  },

  methods: {
    async loadItems() {
      try {
        this.items = ((await API.graphql(
          this.listPostSummary
        )) as any).data.listPostSummary;
      } catch (err) {
        this.error = err;
      }
    }
  },

  async mounted() {
    await this.loadItems();
  }
});
</script>

