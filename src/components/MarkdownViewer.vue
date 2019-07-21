<template>
  <div v-html="markdown"></div>
</template>

<script lang="ts">
import Vue from "vue";
import marked from "marked";
import axios from "axios";

export default Vue.extend({
  data() {
    return {
      content: ""
    };
  },

  props: ["url"],

  computed: {
    markdown() {
      return marked(this.content);
    }
  },

  // This component loads the URL only when mounted
  // Does not support URL changes
  async mounted() {
    this.content = (await axios.get(this.url)).data;
  }
});
</script>

