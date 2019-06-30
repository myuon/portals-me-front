<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">サインイン</p>
          </header>
          <div class="card-content">
            <p style="color: red" v-if="signInError">{{ signInError }}</p>
            <div class="content">
              <div style="margin: 10px;">
                <b-button
                  size="is-medium"
                  icon-left="google"
                  style="background-color: #f43; color: #fff; border: none;"
                  @click="signInWithGoogle"
                >Googleでログイン</b-button>
              </div>
              <div style="margin: 10px;">
                <b-button
                  size="is-medium"
                  icon-left="twitter"
                  style="background-color: #0af; color: #fff; border: none;"
                  @click="signInWithTwitter"
                >Twitterでログイン</b-button>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <router-link to="/signup" class="card-footer-item">アカウントを持っていない場合はこちら</router-link>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { User } from "./User.vue";

export default Vue.extend({
  props: ["signin"],
  data() {
    return {
      signInError: ""
    };
  },
  methods: {
    async signInWithGoogle() {
      /*
      const user = await (this as any).$gAuth.signIn();

      try {
        const result = (await sdk.signIn({
          google: user.getAuthResponse().id_token
        })).data;
        await this.toDashboard(result);
      } catch (err) {
        this.signInError = err.response.data;
        return;
      }
      */
    },
    async signInWithTwitter() {
      const twitterAuthURL = await axios.post(
        `${process.env.VUE_APP_AUTH_API_ENDPOINT}/twitter`
      );
      location.href = twitterAuthURL.data;

      // Jump to mounted.twitter-callback
    },
    async signInWithTwitterAfter(token: {
      oauth_token: string;
      oauth_verifier: string;
    }) {
      try {
        const credential = (await axios.get(
          `${process.env.VUE_APP_AUTH_API_ENDPOINT}/twitter?oauth_token=${
            token.oauth_token
          }&oauth_verifier=${token.oauth_verifier}`
        )).data;
        const data = (await axios.post(
          `${process.env.VUE_APP_AUTH_API_ENDPOINT}/signin`,
          {
            auth_type: "twitter",
            data: {
              credential_token: credential.credential_token,
              credential_secret: credential.credential_secret
            }
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )).data;

        await this.toDashboard(data);
      } catch (err) {
        this.signInError = "LoginError";
        this.$router.push("/signin");
        return;
      }
    },
    async toDashboard(token: string) {
      localStorage.setItem("id_token", token);
      localStorage.setItem(
        "user",
        decodeURIComponent(
          escape(atob(JSON.parse(atob(token.split(".")[1])).data))
        )
      );
      this.$router.push("/dashboard");
    }
  },
  mounted() {
    // twitter-callback
    // Continue to signInWithTwitter
    if (this.$route.path.startsWith("/signin/twitter-callback")) {
      this.signInWithTwitterAfter(this.$route.query as {
        oauth_token: string;
        oauth_verifier: string;
      });
    }
  }
});
</script>

