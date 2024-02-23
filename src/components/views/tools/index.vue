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
          <div class="c-tools__list__tags">
            <div
              v-for="tag in slotProps.content.tags"
              class="c-tools__list__tags__content"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </template>
    </LinkCardList>
  </div>
</template>

<script setup lang="ts">
import LinkCardList from "@/components/atoms/lists/LinkCardList.vue";
import { CONTENTS_TITLE } from "@/composables/const/title";
import { CONTENTS_DESCRIPTION } from "@/composables/const/description";

const tools = [
  {
    path: "CustomeStopwatch",
    title: CONTENTS_TITLE.TOOLS_STOPWATCH,
    description: CONTENTS_DESCRIPTION.TOOLS_STOPWATCH,
    tags: ["OBS対応"],
  },
  {
    path: "ViewTranslate",
    title: CONTENTS_TITLE.TOOLS_TRANSLATE,
    description: CONTENTS_DESCRIPTION.TOOLS_TRANSLATE,
    tags: [],
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
    &__tags {
      margin-top: 8px;
      font-size: 12px;
      display: flex;
      gap: 4px;
      &__content {
        background-color: lightgray;
        border-radius: 20px;
        width: fit-content;
        padding: 2px 10px;
      }
    }
  }
}
</style>
