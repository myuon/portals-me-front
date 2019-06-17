<template>
  <div>
    <v-layout flex-child wrap>
      <v-hover :key="'v-hover-' + index" v-for="(article, index) in articles">
        <v-flex md3 d-flex slot-scope="{ hover }" @click="clickArticleCard(index)">
          <v-card class="mx-auto" :class="`elevation-${hover ? 6 : 2}`">
            <v-img
              :aspect-ratio="16/9"
              :src="article.entity.type == 'image' ? article.entity.url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2N4+PDhfwAI7QOjRSIQaQAAAABJRU5ErkJggg=='"
            />
            <v-card-title>{{ article.title }}</v-card-title>
          </v-card>
        </v-flex>
      </v-hover>
    </v-layout>

    <v-dialog v-model="dialog" max-width="600">
      <v-card class="text-sm-left">
        <v-card-title class="headline" v-if="activeArticle.id">{{ activeArticle.title }}</v-card-title>

        <v-card-text>
          <pre v-if="activeArticle.id">{{ activeArticle.description }}</pre>

          <p v-if="activeArticle.id && activeArticle.entity.type == 'share'">
            <a :href="activeArticle.entity.url">{{ activeArticle.entity.url }}</a>
          </p>

          <v-img
            :src="activeArticle.entity.url"
            v-if="activeArticle.id && activeArticle.entity.type == 'image'"
          />
          <div ref="articleDialog"></div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      articles: [],
      activeArticle: {},
      dialog: null
    };
  }
});
</script>
