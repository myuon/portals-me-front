<template>
  <div>
    <b-field label="タイトル">
      <b-input v-model="title" />
    </b-field>

    <b-field label="説明">
      <b-input type="textarea" v-model="description" />
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
import axios from "axios";
import * as mutations from "../../graphql/mutations";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as APITypes from "../../API";
import { GraphQLResult } from "@aws-amplify/api/lib/types";

export default Vue.extend({
  data() {
    return {
      dropFiles: [],
      title: "",
      description: ""
    };
  },

  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },

    async submit() {
      const form = new FormData();
      this.dropFiles.forEach(file => {
        form.append(file.name, file);
      });

      const urls = ((await API.graphql(
        graphqlOperation(mutations.generateUploadUrl, {
          keys: this.dropFiles.map(file => file.name)
        })
      )) as any).data.generateUploadURL;
      console.log(urls);

      const imagePostInput: APITypes.AddImagePostMutationVariables = {
        title: this.title || null,
        description: this.description || null,
        entity: {
          images: this.dropFiles.map(
            file =>
              ({
                filetype: file.type,
                s3path: file.name
              } as APITypes.ImageInput)
          )
        }
      };

      const result = await API.graphql(
        graphqlOperation(mutations.addImagePost, imagePostInput)
      );
      await Promise.all(
        urls.map((url, index) => axios.put(url, this.dropFiles[index]))
      );
      console.log(JSON.stringify(result));
      console.log("Created image post");
    }
  }
});
</script>
