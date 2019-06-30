<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-one-quarter">
        <b-field label="user_name">
          <b-input :value="user_name"/>
        </b-field>

        <b-field label="password">
          <b-input :value="password"/>
        </b-field>

        <b-button type="is-primary" @click="submit">Submit</b-button>
      </div>
    </div>
  </div>
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
      const token = await result.text();

      localStorage.setItem("id_token", token);
      localStorage.setItem(
        "user",
        atob(JSON.parse(atob(token.split(".")[1])).data)
      );
      this.$router.push("/dashboard");
    }
  }
});
</script>
