<template>
  <div :class="['icon-button', { 'icon-button-active': active }]" @click="$emit('click')">
    <b-icon :icon="icon" size="is-large"/>
    <div>{{ label }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["icon", "label", "active"]
});
</script>

<style lang="scss" scoped>
.icon-button {
  display: inline-block;
  text-align: center;
  padding-top: 12px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid $primary;
  color: $primary;
  font-weight: bold;
}

.icon-button-active {
  box-shadow: 0 0 0 0.2em lighten($color: $primary, $amount: 60);
}

.icon-button:hover {
  background-color: lighten($color: $primary, $amount: 70);
  border-radius: 50%;
}
</style>

