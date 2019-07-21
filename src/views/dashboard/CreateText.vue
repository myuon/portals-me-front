<template>
  <div>
    <b-field label="タイトル">
      <b-input v-model="title" />
    </b-field>

    <b-field label="本文 (markdownが使えます)">
      <b-input v-model="input" type="textarea"></b-input>
    </b-field>

    <div class="notification">
      <div v-html="markdown"></div>
    </div>

    <b-button type="is-tertiary" @click="submit">投稿</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import * as mutations from "../../graphql/mutations";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as APITypes from "../../API";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import debounce from "debounce";
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
    submit() {}
  }
});
</script>

