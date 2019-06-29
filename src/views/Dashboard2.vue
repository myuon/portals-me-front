<template>
  <div class="column">
    <div class="box">
      <b-field label="タイトル">
        <b-input/>
      </b-field>

      <b-field label="説明">
        <b-input type="textarea"/>
      </b-field>

      <b-tabs position="is-centered" v-model="activeTab">
        <b-tab-item label="共有" icon="share">
          <b-field label="URL">
            <b-input v-model="url"/>
          </b-field>

          <o-embed-preview :url="url"/>
        </b-tab-item>
        <b-tab-item label="画像" icon="image">
          <b-field>
            <b-upload v-model="dropFiles" multiple drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"/>
                  </p>
                  <p>画像ファイルをアップロード</p>
                </div>
              </section>
            </b-upload>
          </b-field>

          <div class="tags">
            <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
              {{ file.name }}
              <button
                class="delete is-small"
                type="button"
                @click="deleteDropFile(index)"
              ></button>
            </span>
          </div>
        </b-tab-item>
      </b-tabs>

      <b-button>投稿</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import OEmbedPreview from "../components/OEmbedPreview.vue";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";

export default Vue.extend({
  components: {
    OEmbedPreview
  },

  data() {
    return {
      activeTab: 0,
      url: "",
      dropFiles: []
    };
  },

  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    }
  }
});
</script>

