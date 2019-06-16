<template>
  <div>
    <v-flex xs3 v-for="collection in collections" :key="collection.id">
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
          <v-btn flat color="indigo" @click="$router.push(`/collections/${collection.id}`)">Open</v-btn>
          <v-spacer></v-spacer>
          <v-icon v-if="collection.media && collection.media.includes('document')">edit</v-icon>
          <v-icon v-if="collection.media && collection.media.includes('picture')">brush</v-icon>
          <v-icon v-if="collection.media && collection.media.includes('movie')">movie</v-icon>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["collections"]
});
</script>

