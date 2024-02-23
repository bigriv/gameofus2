<template>
  <div class="c-blessings">
    <div class="c-blessings__title">お祝い事の一覧！</div>
    <LinkCardList :contents="blessings" class="u-margin_top--10">
      <template v-slot:default="slotProps">
        <div class="c-blessings__list">
          <div class="c-blessings__list__title">
            {{ slotProps.content.title }}
          </div>
          <div class="c-blessings__list__description">
            {{ slotProps.content.description }}
          </div>
          <div class="c-blessings__list__tags">
            <div
              v-for="tag in slotProps.content.tags"
              class="c-blessings__list__tags__content"
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

const blessings = [
  {
    path: "CustomeNewyear",
    title: CONTENTS_TITLE.BLESSINGS_NEWYEAR,
    tags: [],
    description: CONTENTS_DESCRIPTION.BLESSINGS_NEWYEAR,
  },
];
</script>

<style scoped lang="scss">
.c-blessings {
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
