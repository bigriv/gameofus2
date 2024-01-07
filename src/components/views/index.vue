<template>
  <div class="c-contents">
    <LinkCardList :contents="contents">
      <template v-slot:default="slotProps">
        <div class="c-contents__list">
          <div class="c-contents__list__label">
            {{ slotProps.content.label }}
          </div>
          <div class="c-contents__list__description">
            {{ slotProps.content.description }}
          </div>
        </div>
      </template>
    </LinkCardList>
  </div>
</template>

<script setup lang="ts">
import LinkCardList from "@/components/atoms/lists/LinkCardList.vue";

const contents = [
  {
    path: "Game",
    label: "ゲーム",
    description: "完全オリジナルゲームをプレイできます。ぜひプレイしてね。",
  },
  {
    path: "Tool",
    label: "ツール",
    description:
      "汎用ツールを使えます。OBSでの使用も想定しているので、配信用にもどうぞ。",
  },
  {
    path: "Blessing",
    label: "お祝い",
    description:
      "年明けなどのお祝いごとに使えるページです。友達に、家族に、メッセージを送りましょう！",
  },
];
</script>

<style scoped lang="scss">
.c-contents {
  &__list {
    padding: 10px;
    &__label {
      font-size: 20px;
      font-weight: bold;
    }

    &__description {
      font-size: 14px;
    }
  }
}
</style>
