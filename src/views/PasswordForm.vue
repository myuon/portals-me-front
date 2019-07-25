<template>
  <div id="password-form" class="container">
    <div class="columns is-centered">
      <div class="column is-one-quarter">
        <b-field label="user_name">
          <b-input data-cy="user-name" v-model="user_name" />
        </b-field>

        <b-field label="password">
          <b-input data-cy="password" v-model="password" password-reveal />
        </b-field>

        <b-button data-cy="submit" type="is-primary" @click="submit">Submit</b-button>
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
        `${process.env.VUE_APP_AUTH_API_ENDPOINT}/signin`,
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

      this.$store.dispatch("authenticate", { token });
      this.$router.push("/dashboard");
    }
  }
});
</script>
