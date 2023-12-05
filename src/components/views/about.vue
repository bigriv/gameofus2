<template>
  <div class="c-about">
    <h1>About</h1>
    <section>
      <h2>Game of usとは？</h2>
      <article>
        <p>
          GOU(Game of
          us)とは、よしをの作るゲーム、ツール等をまとめたサイトです。
        </p>
        <p>
          和訳は『我々のゲーム』となりますが、現在は一人で制作しています。
          今後、メンバーが増えることを祈って、『us』を付けてるわけです。
          ですので、プログラマー、Webデザイナー、シナリオライター、イラストレーター、動画クリエータなど、様々な人に関わっていただくことを目指してます。
          また、ユーザの皆様からの声をもとに質を向上させていき、ユーザの皆様も含めて『us』としていきたと考えております。
          クリエータの皆様もユーザの皆様も、何卒、よろしくお願いいたします。
        </p>
        <p>
          ちなみに、意味合いとしては所有格にしたかったので、『Our's
          game』の方が正しいです。 『Game of
          us』だと我々の物語のゲームみたいな意味合いになってしまいますが、そこは見逃していただけると幸いです。
        </p>
      </article>
    </section>

    <section>
      <h2>利用について</h2>
      <article>
        <p>GOUで公開しているコンテンツの利用については許可の取得は不要です。</p>
        <p>動画投稿等の二次創作についても制限はありません。</p>
        <p>
          但し、利用した際は
          <router-link :to="{ name: 'Contact' }">こちら</router-link>
          よりご一報いただけると、制作の励みになりますので、ぜひお願いいたします。
        </p>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.c-about {
  max-width: 700px;
  min-width: 300px;
  article {
    background-color: #eee;
    border-radius: 10px;
    padding: 20px;
    p + p {
      margin-top: 10px;
    }
  }
  section + section {
    margin-top: 20px;
  }
}
</style>
