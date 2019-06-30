<template>
  <div class="one-half is-centered">
    <figure class="image is-128x128">
      <img class="is-rounded" :src="user.picture">
    </figure>

    <h2>{{ user.display_name }}</h2>
    <p>@{{ user.name }}</p>

    <b-button type="is-primary">プロフィールを編集</b-button>
    <b-button @click="follow" v-if="user.id != me.id">このユーザーをフォロー</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["user"],

  data() {
    return {
      me: JSON.parse(localStorage.getItem("user")),
      editDialog: false
    };
  },

  methods: {
    updateUserProfile() {},
    follow() {}
  }
});
</script>

