<template>
  <v-layout justify-center>
    <v-flex xs4>
      <v-card>
        <v-card-title class="justify-center" primary-title>
          <h2>Sign Up</h2>
        </v-card-title>
        <v-card-text>
          <p style="color: red">{{ signUpError }}</p>
          <v-stepper class="elevation-0" v-model="signUpStep">
            <v-stepper-content step="1">
              <v-btn color="red" @click="signUpWithGoogle" dark>Googleでアカウント作成</v-btn>
              <br>
              <v-btn color="light-blue" @click="signUpWithTwitter" dark>Twitterでアカウント作成</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-container>
                <form>
                  <v-flex>
                    <v-text-field v-model="form.name" label="ユーザーID" append-outer-icon="check"/>
                    <v-text-field v-model="form.display_name" label="表示される名前"/>
                  </v-flex>
                  <v-avatar color="orange" size="32px">
                    <v-img :src="form.picture"/>
                  </v-avatar>
                  <v-btn depressed>アイコンをアップロード</v-btn>

                  <br>

                  <v-btn color="success" @click="signUp">送信</v-btn>
                  <v-btn depressed @click="signUpStep --;">キャンセル</v-btn>
                </form>
              </v-container>
            </v-stepper-content>
          </v-stepper>

          <br>
          <router-link to="/signin">アカウントを持っている場合はこちら</router-link>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import sdk from "../app/sdk";
import { User } from "./User.vue";

export default Vue.extend({
  props: ["signup"],
  data() {
    return {
      credential_token: "",
      credential_secret: "",
      form: {
        name: "",
        display_name: "",
        picture: ""
      },
      logins: {},
      signUpStep: 1,
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
      this.logins = {
        google: user.getAuthResponse().id_token
      };

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
      this.credential_token = result.credential_token;
      this.credential_secret = result.credential_secret;
      console.log(account);
      console.log(token);

      this.form = {
        name: account.screen_name,
        display_name: account.screen_name,
        picture: account.profile_image_url
      };
      this.logins = {
        twitter: result.credential
      };

      this.signUpStep++;
    },
    async signUp() {
      try {
        const data = (await axios.post(
          `${process.env.VUE_APP_AUTH_API_ENDPOINT}/signup`,
          {
            auth_type: "twitter",
            data: {
              credential_token: this.credential_token,
              credential_secret: this.credential_secret
            },
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

