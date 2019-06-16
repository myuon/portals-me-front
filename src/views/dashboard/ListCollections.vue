<template>
  <amplify-connect :query="listCollectionsQuery">
    <template slot-scope="{loading, data, errors}">
      <div v-if="loading">Loading...</div>
      <div v-else-if="errors.length > 0">Error!</div>
      <div v-else-if="data">
        <v-layout row wrap>
          <v-flex xs3 v-for="collection in data.listCollections" :key="collection.id">
            <v-card>
              <v-img
                aspect-ratio="2.75"
                :class="collection.cover ? collection.cover.color : 'teal darken-2'"
              ></v-img>

              <v-card-title>
                <div>
                  <h3 class="headline mb-0">{{ collection.title }}</h3>
                  <div>{{ collection.description }}</div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn
                  flat
                  color="indigo"
                  @click="$router.push(`/collections/${collection.id}`)"
                >Open</v-btn>
                <v-spacer></v-spacer>
                <v-icon v-if="collection.media && collection.media.includes('document')">edit</v-icon>
                <v-icon v-if="collection.media && collection.media.includes('picture')">brush</v-icon>
                <v-icon v-if="collection.media && collection.media.includes('movie')">movie</v-icon>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </template>
  </amplify-connect>
</template>

<script lang="ts">
import Vue from "vue";
import * as queries from "../../graphql/queries";

export default Vue.extend({
  props: ["collection", "user"],

  computed: {
    listCollectionsQuery() {
      return this.$Amplify.graphqlOperation(queries.listCollections, {
        owner: this.user.id
      });
    }
  }
});
</script>

