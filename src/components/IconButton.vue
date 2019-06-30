<template>
  <div class="icon-button" @click="$emit('click')">
    <b-icon :icon="icon" size="is-large"/>
    <div>{{ label }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["icon", "label"]
});
</script>

<style scoped>
.icon-button {
  display: inline-block;
  text-align: center;
  padding-top: 12px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #cdcdcd;
}

.icon-button:hover {
  background-color: #eee;
  border-radius: 50%;
}
</style>

