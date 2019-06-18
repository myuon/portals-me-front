<template>
  <amplify-connect :mutation="addArticleMutation">
    <template slot-scope="{loading, mutate, errors}">
      <v-btn dark depressed outline color="indigo" @click="dialog = true">
        <v-icon left>add</v-icon>作品を登録
      </v-btn>

      <v-dialog v-model="dialog" max-width="760px">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>作品を登録</v-card-title>

          <v-card-text>
            <template v-if="errors.length > 0">{{ errors }}</template>

            <v-tabs v-model="tab" color="indigo lighten-5">
              <v-tab ripple>URL共有</v-tab>
              <v-tab ripple>ファイル</v-tab>

              <v-tab-item>
                <v-container fluid>
                  <div ref="oEmbedPreview">ここにプレビューが表示されます…</div>
                </v-container>

                <v-form v-model="form.valid" ref="form" lazy-validation>
                  <v-text-field
                    v-model="form.url"
                    label="URLを入力"
                    :rules="[v => !!v || '必須項目です']"
                    required
                    @input="previewOEmbed($refs.oEmbedPreview, form.url)"
                  />

                  <v-text-field
                    v-model="form.title"
                    label="タイトル"
                    :rules="[v => !!v || '必須項目です']"
                    required
                  />

                  <v-textarea v-model="form.description" label="説明(任意)" auto-grow rows="1"/>

                  <v-checkbox
                    v-model="form.checkbox"
                    :rules="[v => !!v || '作品を登録できるのは正当な権利者のみです']"
                    label="私はこの作品の正当な権利者であり、他のいかなる権利の侵害もしていません"
                    required
                  ></v-checkbox>

                  <v-btn :disabled="!form.valid || loading" color="indigo" dark @click="mutate">
                    <v-icon left>send</v-icon>送信
                  </v-btn>
                </v-form>
              </v-tab-item>

              <v-tab-item>
                <v-form v-model="form.valid" ref="form" lazy-validation>
                  <input type="file" multiple accept="image/*" @change="selectFiles">
                  <div class="preview" v-if="imageData">
                    <img v-for="(file, index) in imageData" :key="index" :src="file.src">
                  </div>

                  <v-text-field
                    v-model="form.title"
                    label="タイトル"
                    :rules="[v => !!v || '必須項目です']"
                    required
                  />

                  <v-textarea v-model="form.description" label="説明(任意)" auto-grow rows="1"/>

                  <v-checkbox
                    v-model="form.checkbox"
                    :rules="[v => !!v || '作品を登録できるのは正当な権利者のみです']"
                    label="私はこの作品の正当な権利者であり、他のいかなる権利の侵害もしていません"
                    required
                  ></v-checkbox>

                  <v-btn :disabled="!form.valid" color="indigo" dark @click="submit">
                    <v-icon left>send</v-icon>送信
                  </v-btn>
                </v-form>
              </v-tab-item>
            </v-tabs>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
  </amplify-connect>
</template>

<script lang="ts">
import Vue from "vue";
import { graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as API from "../../API";

export default Vue.extend({
  props: ["user"],

  data() {
    return {
      dialog: false,
      form: {
        valid: true,
        url: "",
        checkbox: false,
        title: "",
        description: ""
      },
      tab: null,
      imageData: null
    };
  },
  computed: {
    addArticleMutation() {
      return this.$Amplify.graphqlOperation(mutations.addArticle, {
        collectionId: this.$route.params.collectionId,
        entity: {
          type: "share",
          format: "oembed",
          url: this.form.url
        },
        title: this.form.title,
        description: this.form.description,
        owner: this.user.id
      } as API.AddArticleMutationVariables);
    }
  },
  methods: {
    async submit() {
      if ((this.$refs.createArticleForm as any).validate()) {
        await this.postArticle();
      }
    },
    selectFiles(input: any) {
      Array.from(input.target.files).forEach((file: any, index) => {
        const url = URL.createObjectURL(file);
        this.imageData.push({ src: url, file: file });
      });
    }
  }
});
</script>
