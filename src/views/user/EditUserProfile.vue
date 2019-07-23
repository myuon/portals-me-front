<template>
  <section>
    <b-field
      :type="nameUniqueness === true ? 'is-success' : nameUniqueness === false ? 'is-danger' : ''"
      :message="nameUniqueness === true ? 'この名前は利用できます' : nameUniqueness === false ? 'この名前は利用できません' : ''"
      label="ユーザーID"
    >
      <b-input v-model="form.name" @input="onInput" />
    </b-field>

    <b-field label="表示名">
      <b-input v-model="form.display_name" />
    </b-field>

    <figure class="image is-32x32">
      <img class="is-rounded" :src="form.picture" />
    </figure>

    <b-field class="file">
      <b-upload v-model="iconFile">
        <a class="button is-primary">
          <b-icon icon="upload"></b-icon>
          <span>アイコンをアップロード</span>
        </a>
      </b-upload>
      <span class="file-name" v-if="iconFile">{{ iconFile.name }}</span>
    </b-field>

    <b-button type="is-success" @click="$emit('submit', form, iconFile)">送信</b-button>
    <b-button @click="$emit('cancel')">キャンセル</b-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  props: ["user"],

  data() {
    return {
      form: {
        name: this.user.name,
        display_name: this.user.display_name,
        picture: this.user.picture
      },
      nameUniqueness: null,
      originalName: this.user.name,
      iconFile: null
    };
  },

  methods: {
    async onInput() {
      if (!this.form.name) {
        this.nameUniqueness = false;
        return;
      }
      if (this.form.name == this.originalName) {
        this.nameUniqueness = null;
        return;
      }

      try {
        await axios.get(
          `${process.env.VUE_APP_AUTH_API_ENDPOINT}/username/${this.form.name}`
        );
        this.nameUniqueness = false;
      } catch (err) {
        if (err.response.status == 404) {
          this.nameUniqueness = true;
        } else {
          throw err;
        }
      }
    }
  },

  watch: {
    user(val) {
      this.form = val;
    }
  }
});
</script>

