<template>
  <v-flex>
    <!--
    <v-subheader>タイムライン</v-subheader>

    <template v-for="(item, index) in timeline">
      <v-divider :key="'div-before-' + index" v-if="index == 0"/>

      <v-list-tile :key="index" two-line>
        <v-list-tile-content>
          <v-list-tile-title v-if="item.event_name == 'INSERT_COLLECTION'">
            <a @click="$router.push(`/users/${item.user_name}`)">{{ item.user_display_name }}</a>さんがコレクション
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
          <v-list-tile-sub-title v-if="item.entity.description">{{ item.entity.description }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-list-tile-action-text>{{ new Date(item.timestamp * 1000).toLocaleString() }}</v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>

      <v-divider :key="'div-' + index"/>
    </template>
    -->

    <v-subheader>コレクション</v-subheader>

    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs3>
          <create-collection :user="user"/>
        </v-flex>
      </v-layout>

      <list-collections :user="user"/>
    </v-container>
  </v-flex>
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import CreateCollection from "./dashboard/CreateCollection.vue";
import ListCollections from "./dashboard/ListCollections.vue";

export default Vue.extend({
  components: {
    CreateCollection,
    ListCollections
  },

  data() {
    return {
      timeline: [],
      user: JSON.parse(localStorage.getItem("user") as string)
    };
  },

  methods: {
    async loadTimeline() {
      /*
      const result = await sdk.timeline.get();
      console.log(result);
      this.timeline = result.data;
      */
    }
  }
});
</script>
