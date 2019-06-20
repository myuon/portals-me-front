<template>
  <div ref="preview"></div>
</template>

<script lang="ts">
import Vue from "vue";
import fetchJsonp from "fetch-jsonp";

export default Vue.extend({
  props: ["url"],

  methods: {
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
    }
  },

  watch: {
    url(newUrl, oldUrl) {
      if (newUrl) {
        this.previewOEmbed(this.$refs.preview as HTMLElement, newUrl);
      } else {
        (this.$refs.preview as HTMLElement).innerHTML = "";
      }
    }
  }
});
</script>
