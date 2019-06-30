<template>
  <div>
    <div style="text-align: center;">
      <icon-button
        icon="share"
        label="共有"
        slot="trigger"
        aria-controls="contentIdForAlly1"
        style="margin: 10px"
        @click="open('share')"
      />
      <icon-button
        icon="image"
        label="画像"
        slot="trigger"
        aria-controls="contentIdForAlly1"
        style="margin: 10px"
        @click="open('image')"
      />
    </div>

    <b-collapse :open.sync="isShareOpen" aria-id="contentIdForA11y1">
      <div class="content">
        <create-share @submit="shareArg = $event; mutate()"/>
      </div>
    </b-collapse>

    <b-collapse :open.sync="isImageOpen" aria-id="contentIdForA11y1">
      <div class="content">
        <create-image/>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CreateShare from "./CreateShare.vue";
import CreateImage from "./CreateImage.vue";
import * as API from "../../API";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import IconButton from "../../components/IconButton.vue";

export default Vue.extend({
  components: {
    CreateShare,
    CreateImage,
    IconButton
  },

  data() {
    return {
      activeTab: 0,
      shareArg: null,
      openTab: null
    };
  },

  computed: {
    isShareOpen() {
      return this.openTab == "share";
    },
    isImageOpen() {
      return this.openTab == "image";
    }
  },

  methods: {
    onCreateFinished(type: string) {
      console.log(`${type} created!`);
    },

    open(tabName: string) {
      this.openTab = this.openTab == tabName ? null : tabName;
    }
  }
});
</script>
