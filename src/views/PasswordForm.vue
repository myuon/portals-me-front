<template>
  <v-layout justify-center>
    <v-flex xs3>
      <v-form>
        <v-text-field v-model="user_name" label="user_name"></v-text-field>
        <v-text-field v-model="password" label="password"></v-text-field>

        <v-btn color="primary" @click="submit">Submit</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      user_name: "",
      password: ""
    };
  },
  methods: {
    async submit() {
      const result = await fetch(
        `${process.env.VUE_APP_AUTH_API_ENDPOINT}/authenticate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            auth_type: "password",
            data: {
              user_name: this.user_name,
              password: this.password
            }
          })
        }
      );

      console.log(await result.text());
    }
  }
});
</script>
