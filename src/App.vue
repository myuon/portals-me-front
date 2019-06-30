<template>
  <div>
    <router-view name="sidebar"/>
    <router-view name="topbar"/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { components } from "aws-amplify-vue";

export default Vue.extend({
  name: "app",
  components: {
    ...components
  }
});
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
