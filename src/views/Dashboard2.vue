<template>
  <div class="column">
    <div class="box">
      <create-post/>
    </div>

    <amplify-connect :query="listPostSummary">
      <template slot-scope="{ loading, data, errors }">
        <template v-if="loading">Loading...</template>
        <template v-else-if="errors.length > 0">{{ errors }}</template>
        <template v-else-if="data">
          <list-post :items="data.listPostSummary"/>
        </template>
      </template>
    </amplify-connect>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CreatePost from "./dashboard2/CreatePost.vue";
import ListPost from "./dashboard2/ListPost.vue";
import * as queries from "../graphql/queries";

export default Vue.extend({
  components: {
    CreatePost,
    ListPost
  },

  computed: {
    listPostSummary() {
      return this.$Amplify.graphqlOperation(queries.listPostSummary);
    }
  }
});
</script>

