<template>
  <v-container>
    <v-dialog v-model="deleteDialog" width="500">
      <v-btn color="error" slot="activator">
        プロジェクトを削除
        <v-icon right dark>delete</v-icon>
      </v-btn>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>削除しますか？</v-card-title>

        <v-card-text>このコレクションを削除しますか？コレクションに属するアイテムもすべて削除され、この操作は取り消すことができません。</v-card-text>

        <v-divider/>

        <v-card-actions>
          <v-spacer/>
          <v-btn color="error" @click="deleteCollection">削除</v-btn>
          <v-btn flat @click="deleteDialog = false">キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      deleteDialog: false
    };
  },

  methods: {
    async deleteCollection() {}
  }
});
</script>

