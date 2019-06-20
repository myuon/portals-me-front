<template>
  <amplify-connect :query="listArticlesQuery">
    <template slot-scope="{loading, data, errors}">
      <div v-if="loading">Loading...</div>
      <div v-else-if="errors.length > 0">{{ errors }}</div>
      <div v-else-if="data">
        <v-layout flex-child wrap>
          <v-hover :key="'v-hover-' + index" v-for="(article, index) in data.listArticles">
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
          <template v-if="index != null">
            <v-card class="text-sm-left">
              <v-card-title class="headline">{{ data.listArticles[index].title }}</v-card-title>

              <v-card-text>
                <pre v-if="data.listArticles[index].id">{{ data.listArticles[index].description }}</pre>

                <p
                  v-if="data.listArticles[index].id && data.listArticles[index].entity.type == 'share'"
                >
                  <a
                    :href="data.listArticles[index].entity.url"
                  >{{ data.listArticles[index].entity.url }}</a>
                </p>

                <v-img
                  :src="data.listArticles[index].entity.url"
                  v-if="data.listArticles[index].id && data.listArticles[index].entity.type == 'image'"
                />
                <div ref="articleDialog"></div>
                <o-embed-preview :url="data.listArticles[index].entity.url"/>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </div>
    </template>
  </amplify-connect>
</template>

<script lang="ts">
import Vue from "vue";
import * as queries from "../../graphql/queries";
import * as API from "../../API";
import OEmbedPreview from "../../components/OEmbedPreview.vue";

export default Vue.extend({
  data() {
    return {
      articles: [],
      activeArticle: {},
      dialog: null,
      index: null
    };
  },

  components: {
    OEmbedPreview
  },

  computed: {
    listArticlesQuery() {
      return this.$Amplify.graphqlOperation(queries.listArticles, {
        collectionId: this.$route.params.collectionId
      } as API.ListArticlesQueryVariables);
    }
  },

  methods: {
    clickArticleCard(index) {
      this.dialog = true;
      this.index = index;
    }
  }
});
</script>
