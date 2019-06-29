<template>
  <amplify-connect :mutation="addCollectionMutation">
    <template slot-scope="{loading, mutate, errors}">
      <v-btn @click="dialog = true" block outline color="indigo">
        <v-icon left>add</v-icon>コレクションを作成
      </v-btn>

      <v-dialog max-width="800" v-model="dialog">
        <v-card>
          <v-card-title class="headline">コレクションを作成</v-card-title>

          <v-card-text>
            <template v-if="errors.length > 0">{{ errors }}</template>

            <v-form>
              <v-text-field label="タイトル" v-model="form.title" required/>
              <v-textarea label="説明" v-model="form.description" rows="1" auto-grow/>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn :disabled="loading" color="success" @click="mutate">Submit</v-btn>

            <v-btn flat>Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </amplify-connect>
</template>

<script lang="ts">
import Vue from "vue";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as mutations from "../../graphql/mutations";

export default Vue.extend({
  props: ["user"],

  data() {
    return {
      dialog: false,
      form: {
        title: "",
        description: ""
      }
    };
  },

  computed: {
    addCollectionMutation() {
      return this.$Amplify.graphqlOperation(mutations.addCollection, {
        owner: this.user.id,
        name: this.form.title,
        title: this.form.title,
        description: this.form.description
      });
    }
  },

  methods: {
    async createProject() {
      const result = (await API.graphql(
        graphqlOperation(mutations.addCollection, {
          owner: this.user.id,
          name: this.form.title,
          title: this.form.title,
          description: this.form.description
        })
      )) as GraphQLResult;
      if (result.errors.length > 0) {
        console.error(result);
      }

      this.dialog = false;
    }
  }
});
</script>
