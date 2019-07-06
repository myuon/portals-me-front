<template>
  <div>
    <b-field label="タイトル">
      <b-input />
    </b-field>

    <b-field label="説明">
      <b-input type="textarea" />
    </b-field>

    <b-field>
      <b-upload v-model="dropFiles" multiple drag-drop>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large" />
            </p>
            <p>画像ファイルをアップロード</p>
          </div>
        </section>
      </b-upload>
    </b-field>

    <div class="tags">
      <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
        {{ file.name }}
        <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
      </span>
    </div>

    <b-button type="is-tertiary" @click="submit">投稿</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      dropFiles: []
    };
  },

  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },

    submit() {
      const formData = new FormData();
      this.dropFiles.forEach(file => {
        formData.append(file.name, file);
      });

      console.log(formData);
    }
  }
});
</script>

