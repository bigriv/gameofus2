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
    path: "Blessing",
    label: "お祝い",
    description:
      "誕生日などのお祝いごとに使えるページです。開発中なので楽しみにしててね。",
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
