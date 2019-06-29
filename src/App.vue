<template>
  <v-app>
    <router-view name="sidebar"/>
    <router-view name="topbar"/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
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
