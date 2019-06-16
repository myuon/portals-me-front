<template>
  <div>
    <v-btn dark depressed outline color="indigo" @click="createArticleDialog = true">
      <v-icon left>add</v-icon>作品を登録
    </v-btn>

    <v-dialog v-model="createArticleDialog" max-width="760px">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>作品を登録</v-card-title>

        <v-card-text>
          <v-tabs v-model="activeTabInCreateArticleDialog" color="indigo lighten-5">
            <v-tab ripple>URL共有</v-tab>
            <v-tab ripple>ファイル</v-tab>

            <v-tab-item>
              <v-container fluid>
                <div ref="oEmbedPreview">ここにプレビューが表示されます…</div>
              </v-container>

              <v-form v-model="createArticleForm.valid" ref="createArticleForm" lazy-validation>
                <v-text-field
                  v-model="createArticleForm.url"
                  label="URLを入力"
                  :rules="[v => !!v || '必須項目です']"
                  required
                  @input="previewOEmbed($refs.oEmbedPreview, createArticleForm.url)"
                />

                <v-text-field
                  v-model="createArticleForm.title"
                  label="タイトル"
                  :rules="[v => !!v || '必須項目です']"
                  required
                />

                <v-textarea
                  v-model="createArticleForm.description"
                  label="説明(任意)"
                  auto-grow
                  rows="1"
                />

                <v-checkbox
                  v-model="createArticleForm.checkbox"
                  :rules="[v => !!v || '作品を登録できるのは正当な権利者のみです']"
                  label="私はこの作品の正当な権利者であり、他のいかなる権利の侵害もしていません"
                  required
                ></v-checkbox>

                <v-btn :disabled="!createArticleForm.valid" color="indigo" dark @click="submit">
                  <v-icon left>send</v-icon>送信
                </v-btn>
              </v-form>
            </v-tab-item>

            <v-tab-item>
              <v-form v-model="createArticleForm.valid" ref="createArticleForm" lazy-validation>
                <input type="file" multiple accept="image/*" @change="selectFiles">
                <div class="preview" v-if="imageData">
                  <img v-for="(file, index) in imageData" :key="index" :src="file.src">
                </div>

                <v-text-field
                  v-model="createArticleForm.title"
                  label="タイトル"
                  :rules="[v => !!v || '必須項目です']"
                  required
                />

                <v-textarea
                  v-model="createArticleForm.description"
                  label="説明(任意)"
                  auto-grow
                  rows="1"
                />

                <v-checkbox
                  v-model="createArticleForm.checkbox"
                  :rules="[v => !!v || '作品を登録できるのは正当な権利者のみです']"
                  label="私はこの作品の正当な権利者であり、他のいかなる権利の侵害もしていません"
                  required
                ></v-checkbox>

                <v-btn :disabled="!createArticleForm.valid" color="indigo" dark @click="submit">
                  <v-icon left>send</v-icon>送信
                </v-btn>
              </v-form>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

