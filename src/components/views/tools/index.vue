<template>
  <div class="c-tools">
    <div class="c-tools__title">ツールの一覧！</div>
    <LinkCardList :contents="tools" class="u-margin_top--10">
      <template v-slot:default="slotProps">
        <div class="c-tools__list">
          <div class="c-tools__list__title">
            {{ slotProps.content.title }}
          </div>
          <div class="c-tools__list__description">
            {{ slotProps.content.description }}
          </div>
        </div>
      </template>
    </LinkCardList>
  </div>
</template>

<script setup lang="ts">
import LinkCardList from "@/components/atoms/lists/LinkCardList.vue";

const tools = [
  {
    path: "CustomeStopwatch",
    title: "ストップウォッチ",
    description: "時間を計れます。",
  },
  {
    path: "ViewTranslate",
    title: "翻訳機",
    description: "いくつかの言語の翻訳ができます。",
  },
];
</script>

<style scoped lang="scss">
.c-tools {
  &__title {
    text-wrap: nowrap;
  }
  &__list {
    padding: 10px;
    &__title {
      font-size: 20px;
      font-weight: bold;
      margin-top: 2px;
    }
    &__description {
      font-size: 14px;
      margin-top: 2px;
    }
  }
}
</style>
