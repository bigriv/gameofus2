<template>
  <div class="c-games">
    <div class="c-games__title">ゲームの一覧！</div>
    <LinkCardList :contents="games" class="u-margin_top--10">
      <template v-slot:default="slotProps">
        <div class="c-games__list">
          <div class="c-games__list__title">
            {{ slotProps.content.title }}
          </div>
          <div class="c-games__list__playtime">
            推定プレイ時間: {{ slotProps.content.playtime }}
          </div>
          <div class="c-games__list__description">
            {{ slotProps.content.description }}
          </div>
          <div class="c-games__list__tags">
            <div
              v-for="tag in slotProps.content.tags"
              class="c-games__list__tags__content"
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

const games = [
  {
    path: "Wil",
    title: CONTENTS_TITLE.GAMES_WIL,
    tags: ["RPG", "スマホ対応"],
    playtime: "1~2時間",
    description: CONTENTS_DESCRIPTION.GAMES_WIL,
  },
  {
    path: "Mp",
    title: CONTENTS_TITLE.GAMES_MP,
    tags: ["ミニゲーム", "短時間", "スマホ対応"],
    playtime: "1分",
    description: CONTENTS_DESCRIPTION.GAMES_MP,
  },
  // {
  //   path: "Was",
  //   title: CONTENTS_TITLE.GAMES_WAS,
  //   tags: ["RPG", "短時間", "スマホ対応"],
  //   playtime: "30分",
  //   description: CONTENTS_DESCRIPTION.GAMES_WAS,
  // },
  {
    path: "Tbh",
    title: CONTENTS_TITLE.GAMES_TBH,
    tags: ["育成", "短時間"],
    playtime: "10分",
    description: CONTENTS_DESCRIPTION.GAMES_TBH,
  },
];
</script>

<style scoped lang="scss">
.c-games {
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
    &__playtime,
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
