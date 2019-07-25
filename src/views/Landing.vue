<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Portals@me</h1>
          <h2 class="subtitle">クリエイターの発信の場を提供します</h2>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="columns">
        <div class="column">
          <b-icon icon="share-variant" size="is-large" style="color: #e16;" />
          <h2>作品の共有</h2>
          <span>Portals@meから、あるいは他のサイトから作品を共有します。創作物はイラスト・文章・動画・ゲーム・ソフトウェアなど多岐にわたります。</span>
        </div>

        <div class="column">
          <b-icon icon="emoticon" size="is-large" style="color: #f90;" />
          <h2>リアクション</h2>
          <span>素敵だと思った作品に対してはコメントやリアクションなどを付けてみましょう。作品への感想は新たな創作のきっかけとなります。</span>
        </div>

        <div class="column">
          <b-icon icon="folder-multiple-image" size="is-large" style="color: #098;" />
          <h2>コレクション</h2>
          <span>クリエイターの作品群はコレクションとして整理され公開されます。クリエイターのマルチな創作を支援し気軽な発信を手助けします。</span>
        </div>

        <div class="column">
          <b-icon icon="earth" size="is-large" style="color: #35b;" />
          <h2>ソーシャル</h2>
          <span>他のクリエイターの活動を覗いてみましょう。新たな作品の発見だけでなく、皆がどんなことに興味を持っているかも分かるかもしれません。</span>
        </div>
      </div>
    </div>

    <div class="columns is-centered">
      <div class="column is-half" style="text-align: center;">
        <b-button
          id="go-to-signup"
          size="is-medium"
          type="is-primary"
          @click="$router.push('/signup')"
          dark
        >アカウントを作成</b-button>
        <p>
          あるいは
          <a id="go-to-signin" @click="$router.push('/signin')">すでにアカウントを持っていますか？</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>
