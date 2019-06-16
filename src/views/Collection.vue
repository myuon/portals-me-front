<template>
  <v-container grid-list-md fluid>
    <v-flex xs12 class="collection-title">
      <v-layout row wrap class="text-sm-left">
        <v-flex xs5>
          <h2>
            <v-icon>collections</v-icon>
            {{ collection.owner_name }} / {{ collection.title }}
          </h2>
          <pre>{{ collection.description }}</pre>
        </v-flex>

        <v-spacer/>

        <add-article/>
      </v-layout>
    </v-flex>

    <v-tabs class="collection-tab">
      <v-tab>
        <v-icon>layers</v-icon>作品
      </v-tab>
      <v-tab>
        <v-icon>chat</v-icon>チャンネル
      </v-tab>
      <v-tab>
        <v-icon>settings</v-icon>設定
      </v-tab>

      <v-tab-item class="collection-layout">
        <list-articles/>
      </v-tab-item>
      <v-tab-item>
        <channel/>
      </v-tab-item>
      <v-tab-item>
        <settings/>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import AutogrowTextarea from "../components/AutogrowTextarea.vue";
import fetchJsonp from "fetch-jsonp";
import sdk from "../app/sdk";
import axios from "axios";
import { User } from "./User.vue";
import AddArticle from "./collection/AddArticle.vue";
import ListArticles from "./collection/ListArticles.vue";
import Channel from "./collection/Channel.vue";
import Settings from "./collection/Settings.vue";

export default Vue.extend({
  data() {
    return {
      activeTabInCreateArticleDialog: null,
      articleDialog: false,
      createArticleDialog: false,
      createArticleDialogTab: null,
      createArticleForm: {
        valid: true,
        url: "",
        checkbox: false,
        title: "",
        description: ""
      },
      collection: {},
      deleteDialog: null,
      articles: [] as { entity: { url: string; type: string } }[],
      activeArticle: {} as { entity: { url: string; type: string } },
      imageData: [] as { src: string; file: File }[]
    };
  },
  components: {
    SheetFooter: {
      functional: true,

      render(h: any, { children }: any) {
        return h(
          "v-sheet",
          {
            staticClass: "mt-auto align-center justify-center d-flex",
            props: {
              color: "rgba(0, 0, 0, .36)",
              dark: true,
              height: 50
            }
          },
          children
        );
      }
    },
    AutogrowTextarea,
    AddArticle,
    ListArticles,
    Channel,
    Settings
  },
  methods: {
    selectFiles(input: any) {
      Array.from(input.target.files).forEach((file: any, index) => {
        const url = URL.createObjectURL(file);
        this.imageData.push({ src: url, file: file });
      });
    },
    clickArticleCard(index: number) {
      this.articleDialog = true;
      this.activeArticle = this.articles[index];

      if (this.activeArticle.entity.type === "share") {
        this.previewOEmbed(
          this.$refs.articleDialog as HTMLElement,
          this.activeArticle.entity.url
        );
      } else {
        (this.$refs.articleDialog as HTMLElement).innerHTML = "";
      }
    },
    async previewOEmbed(elem: HTMLElement, url_raw: string) {
      const getProvider = (url: string) => {
        if (/https:\/\/twitter\.com\/.*\/status\/.*/.test(url)) {
          return `https://publish.twitter.com/oembed?format=json&url=${encodeURIComponent(
            url
          )}`;
        }
      };

      const url = getProvider(url_raw);

      if (!url) {
        elem.innerText = "ここにプレビューが表示されます…";
        return;
      }

      const response = await fetchJsonp(url);
      const card_json = await response.json();

      const replaceHTML = (element: any, html: string) => {
        element.innerHTML = html;
        element.querySelectorAll("script").forEach((scriptElement: any) => {
          const se: HTMLScriptElement = document.createElement("script");
          se.src = scriptElement.src;
          scriptElement.replaceWith(se);
        });
      };

      replaceHTML(elem, card_json.html);
    },
    async loadArticles() {
      const collectionId = this.$route.params.collectionId;
      const result = (await sdk.article.list(collectionId)).data;
      this.articles = result;
    },
    async submit() {
      if ((this.$refs.createArticleForm as any).validate()) {
        await this.postArticle();
      }
    },
    async postArticle() {
      const collectionId = this.$route.params.collectionId;

      if (this.imageData.length != 0) {
        const presignedURL = (await sdk.article.generate_presigned_url(
          collectionId,
          this.imageData[0].file.name
        )).data;
        await axios.put(presignedURL, this.imageData[0].file, {
          headers: { "Content-Type": this.imageData[0].file.type }
        });

        const user = JSON.parse(localStorage.getItem("user") || "") as User;
        await sdk.article.create(collectionId, {
          title: this.createArticleForm.title,
          description: this.createArticleForm.description,
          entity: {
            type: "image",
            format: "png",
            url: `https://s3-ap-northeast-1.amazonaws.com/portals-me-storage-users/${encodeURIComponent(
              user.id
            )}/${collectionId}/${this.imageData[0].file.name}`
          }
        });
      } else {
        await sdk.article.create(collectionId, {
          title: this.createArticleForm.title,
          description: this.createArticleForm.description,
          entity: {
            type: "share",
            format: "oembed",
            url: this.createArticleForm.url
          }
        });
      }

      this.createArticleDialog = false;
      await this.loadArticles();
    },
    async loadCollection() {
      const collectionId = this.$route.params.collectionId;
      const collection = (await sdk.collection.get(collectionId)).data;
      this.collection = Object.assign(collection);
    },
    async deleteCollection() {
      const collectionId = this.$route.params.collectionId;
      await sdk.collection.delete(collectionId);
      await this.$store.dispatch("markCollectionsReload");
      this.$router.push("/dashboard");
    }
  },
  async mounted() {
    await Promise.all([this.loadCollection(), this.loadArticles()]);
  }
});
</script>

<style scoped>
.collection-title {
  margin-bottom: 1em;
}

.collection-tab .v-icon {
  margin-right: 0.2em;
}

.collection-layout .card {
  margin-top: 1rem;
}

.message {
  display: flex;
}

.message .v-avatar {
  display: block;
  flex: 0 0 auto;
  height: auto;
  margin-right: 20px;
}

.message .content {
  display: block;
  flex: 1 1 auto;
  margin-top: 1em;
}

.message .input-area {
  display: flex;
}

.message .input-area > div {
  display: block;
  flex: 1 1 auto;
}

.message .input-area > .v-btn {
  margin-top: 0;
  margin-bottom: 0;
}

.message .content .header {
  margin-bottom: 0.3em;
}
</style>
