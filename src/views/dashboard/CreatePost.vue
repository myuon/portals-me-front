<template>
  <div>
    <b-tabs position="is-centered" v-model="activeTab">
      <b-tab-item label="共有" icon="share">
        <create-share @submit="shareArg = $event; mutate()"/>
      </b-tab-item>
      <b-tab-item label="画像" icon="image">
        <create-image/>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CreateShare from "./CreateShare.vue";
import CreateImage from "./CreateImage.vue";
import * as API from "../../API";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";

export default Vue.extend({
  components: {
    CreateShare,
    CreateImage
  },

  data() {
    return {
      activeTab: 0,
      shareArg: null
    };
  },

  computed: {},

  methods: {
    onCreateFinished(type: string) {
      console.log(`${type} created!`);
    }
  }
});
</script>

