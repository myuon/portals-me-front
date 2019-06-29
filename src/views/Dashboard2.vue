<template>
  <div class="column">
    <div class="box">
      <create-post/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CreatePost from "./dashboard2/CreatePost.vue";

export default Vue.extend({
  components: {
    CreatePost
  }
});
</script>

