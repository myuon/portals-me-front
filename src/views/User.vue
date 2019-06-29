<template>
  <v-container>
    <amplify-connect :query="getUser">
      <template slot-scope="{loading, data, errors}">
        <template v-if="loading">loading...</template>
        <template v-if="errors.length > 0">{{ errors }}</template>
        <v-layout justify-center v-if="data.getUserByName">
          <v-flex xs8>
            <v-avatar size="120" color="grey lighten-4">
              <img :src="data.getUserByName.picture" alt="avatar">
            </v-avatar>

            <h2>{{ data.getUserByName.display_name }}</h2>
            <p>@{{ data.getUserByName.name }}</p>

            <v-dialog v-model="editDialog" width="500" v-if="data.getUserByName.id == me.id">
              <v-btn outline color="indigo" style="margin-left: 0;" slot="activator">プロフィールを編集</v-btn>

              <v-card>
                <v-card-title>
                  <edit-user-basic-profile
                    :formData="{ name: data.getUserByName.name, display_name: data.getUserByName.display_name, picture: data.getUserByName.picture }"
                    @submit="updateUserProfile"
                  />
                </v-card-title>
              </v-card>
            </v-dialog>

            <v-btn
              outline
              color="indigo"
              style="margin-left: 0;"
              @click="follow"
              v-if="data.getUserByName.id != me.id"
            >このユーザーをフォロー</v-btn>

            <v-flex xs12>
              <v-list>
                ユーザーアクティビティ
                <template v-for="(item, index) in feed">
                  <v-divider :key="'div-before-' + index" v-if="index == 0"/>

                  <v-list-tile :key="index" two-line>
                    <v-list-tile-content>
                      <v-list-tile-title v-if="item.event_name == 'INSERT_COLLECTION'">
                        コレクション
                        <a
                          @click="$router.push(`/collections/${item.item_id.split('collection##')[1]}`)"
                        >{{ item.entity.title }}</a>を作りました
                      </v-list-tile-title>
                      <v-list-tile-title v-if="item.event_name == 'INSERT_ARTICLE'">
                        作品
                        <a
                          @click="$router.push(`/collections/${item.item_id.split('/')[0].split('collection##')[1]}`)"
                        >{{ item.entity.title }}</a>を投稿しました
                      </v-list-tile-title>
                      <v-list-tile-sub-title
                        v-if="item.entity.description"
                      >{{ item.entity.description }}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-list-tile-action-text>{{ new Date(item.timestamp * 1000).toLocaleString() }}</v-list-tile-action-text>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-divider :key="'div-' + index"/>
                </template>
              </v-list>
            </v-flex>
          </v-flex>
        </v-layout>
      </template>
    </amplify-connect>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import sdk from "../app/sdk";
import EditUserBasicProfile from "../components/EditUserBasicProfile.vue";
import * as API from "../API";
import * as queries from "../graphql/queries";

export interface User {
  id: string;
}

export default Vue.extend({
  components: {
    EditUserBasicProfile
  },

  data() {
    return {
      user: null as User | null,
      feed: [],
      me: JSON.parse(localStorage.getItem("user")),
      editDialog: false
    };
  },

  computed: {
    getUser() {
      return this.$Amplify.graphqlOperation(queries.getUserByName, {
        name: this.$route.params.name
      });
    }
  },

  methods: {
    updateUserProfile() {}
  }
});
</script>
