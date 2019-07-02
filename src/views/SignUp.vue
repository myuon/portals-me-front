<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">サインアップ</p>
          </header>
          <div class="card-content">
            <p style="color: red" v-if="signUpError">{{ signUpError }}</p>

            <b-steps v-model="signUpStep" :has-navigation="false">
              <b-step-item label="認証" icon="login">
                <div class="content">
                  <div style="margin: 10px;">
                    <b-button
                      size="is-medium"
                      icon-left="google"
                      style="background-color: #f43; color: #fff; border: none;"
                      @click="signUpWithGoogle"
                    >Googleでアカウント作成</b-button>
                  </div>
                  <div style="margin: 10px;">
                    <b-button
                      size="is-medium"
                      icon-left="twitter"
                      style="background-color: #0af; color: #fff; border: none;"
                      @click="signUpWithTwitter"
                    >Twitterでアカウント作成</b-button>
                  </div>
                </div>
              </b-step-item>
              <b-step-item label="プロフィール設定" icon="account">
                <b-field label="ユーザーID">
                  <b-input :value="form.name"/>
                </b-field>

                <b-field label="表示名">
                  <b-input :value="form.display_name"/>
                </b-field>

                <figure class="image is-32x32">
                  <img class="is-rounded" :src="form.picture">
                </figure>

                <b-button type="is-success" @click="signUp">送信</b-button>
                <b-button @click="signUpStep --; $router.push('/signup')">キャンセル</b-button>
              </b-step-item>
              <b-step-item label="完了" icon="account-plus"></b-step-item>
            </b-steps>
          </div>
          <footer class="card-footer">
            <router-link to="/signin" class="card-footer-item">アカウントを持っている場合はこちら</router-link>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import { User } from "./User.vue";

export default Vue.extend({
  props: ["signup"],
  data() {
    return {
      auth_type: "",
      google_token: {},
      twitter_token: {},
      form: {
        name: "",
        display_name: "",
        picture: ""
      },
      signUpStep: 0,
      signUpError: ""
    };
  },
  methods: {
    async toDashboard(token: string) {
      localStorage.setItem("id_token", token);
      localStorage.setItem(
        "user",
        decodeURIComponent(
          escape(atob(JSON.parse(atob(token.split(".")[1])).data))
        )
      );
      this.$router.push("/dashboard");
    },
    async signUpWithGoogle() {
      const user = await (this as any).$gAuth.signIn();
      const profile = user.getBasicProfile();

      this.form = {
        name: profile.getId(),
        display_name: profile.getName(),
        picture: profile.getImageUrl()
      };
      this.auth_type = "google";
      this.google_token = { token: user.getAuthResponse().id_token };

      this.signUpStep++;
    },
    async signUpWithTwitter() {
      const twitterAuthURL = await axios.post(
        `${process.env.VUE_APP_API_ENDPOINT}/auth/twitter`
      );
      location.href = twitterAuthURL.data;
    },
    async signUpWithTwitterAfter(token: {
      oauth_token: string;
      oauth_verifier: string;
    }) {
      const result = (await axios.get(
        `${process.env.VUE_APP_AUTH_API_ENDPOINT}/twitter?oauth_token=${
          token.oauth_token
        }&oauth_verifier=${token.oauth_verifier}`
      )).data;
      const account = result.account;

      this.form = {
        name: account.screen_name,
        display_name: account.screen_name,
        picture: account.profile_image_url
      };
      this.auth_token = "twitter";
      this.twitter_token = {
        credential_token: result.credential_token,
        credential_secret: result.credential_secret
      };

      this.signUpStep++;
    },
    async signUp() {
      try {
        const data = (await axios.post(
          `${process.env.VUE_APP_AUTH_API_ENDPOINT}/signup`,
          {
            auth_type: this.auth_type,
            data:
              this.auth_type == "twitter"
                ? this.twitter_token
                : this.auth_type == "google"
                ? this.google_token
                : new Error("auth_type error"),
            user: {
              name: this.form.name,
              display_name: this.form.display_name,
              picture: this.form.picture
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
        this.signUpError = "SignUpError";
        this.$router.push("/signup");
        this.signUpStep = 1;
        return;
      }
    }
  },
  mounted() {
    // twitter-callback
    // Continue to signUpWithTwitter
    if (this.$route.path.startsWith("/signup/twitter-callback")) {
      this.signUpWithTwitterAfter(this.$route.query as {
        oauth_token: string;
        oauth_verifier: string;
      });
    }
  }
});
</script>

