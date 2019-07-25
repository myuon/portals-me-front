<template>
  <div>
    <b-field label="タイトル">
      <b-input data-cy="article-title" v-model="title" />
    </b-field>

    <b-field label="本文 (markdownが使えます)">
      <b-input data-cy="article-content" v-model="input" type="textarea"></b-input>
    </b-field>

    <div class="notification">
      <div v-html="markdown"></div>
    </div>

    <b-button data-cy="submit" type="is-tertiary" @click="submit">投稿</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import * as mutations from "../../graphql/mutations";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as APITypes from "../../API";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import marked from "marked";

export default Vue.extend({
  data() {
    return {
      title: "",
      input: ""
    };
  },

  computed: {
    markdown() {
      return marked(this.input);
    }
  },

  methods: {
    async submit() {
      const filename = `${new Date().getTime()}.md`;
      const urls = ((await API.graphql(
        graphqlOperation(mutations.generateUploadUrl, {
          keys: [filename]
        })
      )) as any).data.generateUploadURL;

      const articlePostInput: APITypes.AddArticlePostMutationVariables = {
        title: this.title || null,
        entity: {
          filetype: "markdown",
          s3path: filename
        }
      };

      await API.graphql(
        graphqlOperation(mutations.addArticlePost, articlePostInput)
      );
      await axios.put(urls[0], this.input);

      this.onCreateFinished();
    },

    onCreateFinished() {
      this.title = "";
      this.input = "";

      console.log("Created article post");

      this.$emit("posted");
    }
  }
});
</script>

