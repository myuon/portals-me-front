<template>
  <div>
    <div class="card" v-for="(item, index) in items" :key="index">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="item.owner_user.picture" alt="Placeholder image">
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
          <o-embed-preview :url="item.entity.url"/>
          <time :datetime="item.updated_at">{{ item.updated_at }}</time>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import OEmbedPreview from "../../components/OEmbedPreview.vue";
import * as API from "../../API";

export default Vue.extend({
  props: ["items"],

  components: {
    OEmbedPreview
  }
});
</script>

