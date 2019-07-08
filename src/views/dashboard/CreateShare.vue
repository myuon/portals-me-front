<template>
  <amplify-connect :mutation="createSharePost" @done="onCreateFinished">
    <template slot-scope="{ loading, mutate, errors }">
      <template v-if="errors.length > 0">
        <p>{{ errors }}</p>
      </template>

      <b-field label="タイトル">
        <b-input v-model="title" />
      </b-field>

      <b-field label="説明">
        <b-input type="textarea" v-model="description" />
      </b-field>

      <b-field label="URL">
        <b-input v-model="url" />
      </b-field>

      <o-embed-preview :url="url" />

      <b-button type="is-tertiary" :disabled="loading" @click="mutate">投稿</b-button>
    </template>
  </amplify-connect>
</template>

<script lang="ts">
import Vue from "vue";
import OEmbedPreview from "../../components/OEmbedPreview.vue";
import * as API from "../../API";
import * as mutations from "../../graphql/mutations";

export default Vue.extend({
  components: {
    OEmbedPreview
  },

  data() {
    return {
      title: "",
      description: "",
      url: ""
    };
  },

  computed: {
    createSharePost() {
      const arg: API.AddSharePostMutationVariables = {
        title: this.title || null,
        description: this.description || null,
        entity: {
          format: "oembed",
          url: this.url
        }
      };

      return this.$Amplify.graphqlOperation(mutations.addSharePost, arg);
    }
  },

  methods: {
    onCreateFinished() {
      this.title = "";
      this.description = "";
      this.url = "";

      console.log("CreateShare finished");

      this.$emit("posted");
    }
  }
});
</script>
