<template>
  <div>
    <div class="card" v-for="(item, index) in items" :key="index">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="item.owner_user.picture" alt="Placeholder image" />
            </figure>
          </div>

          <div class="media-content">
            <p class="title is-4">{{ item.owner_user.display_name }}</p>
            <p class="subtitle is-6">@{{ item.owner_user.name }}</p>
          </div>
        </div>

        <div class="content">
          <p class="title is-4">{{ item.title }}</p>
          <p>{{ item.description }}</p>
          <div class="container">
            <o-embed-preview
              :url="item.entity.url"
              v-if="item.entity_type == 'Share'"
              style="margin:auto"
            />
            <div v-else-if="item.entity_type == 'Images'">
              <figure
                class="image is-16by9"
                :key="index"
                v-for="(image,index) in item.entity.images"
              >
                <img :src="`${filesURL}/${item.owner}/${image.s3path}`" />
              </figure>
            </div>
            <div v-else-if="item.entity_type == 'Article'">
              <markdown-viewer :url="`${filesURL}/${item.owner}/${item.entity.s3path}`" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  object-fit: cover;
}
</style>

<script lang="ts">
import Vue from "vue";
import OEmbedPreview from "../../components/OEmbedPreview.vue";
import MarkdownViewer from "../../components/MarkdownViewer.vue";
import * as API from "../../API";

export default Vue.extend({
  props: ["items"],

  components: {
    OEmbedPreview,
    MarkdownViewer
  },

  computed: {
    filesURL() {
      return process.env.VUE_APP_FILES_URL;
    }
  }
});
</script>
