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
import * as queries_extra from "../graphql/queries_extra";
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
    fetchTimeline() {
      return this.$Amplify.graphqlOperation(queries_extra.FetchTimeline);
    }
  },

  methods: {
    async loadItems() {
      try {
        this.items = ((await API.graphql(
          this.fetchTimeline
        )) as any).data.fetchTimeline;
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

