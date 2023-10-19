<template>
  <div class="c-game">
    <div class="c-game__drawer">
      <GOUVisualCanvas :objects="backgroundLayer" />
    </div>
    <div class="c-game__drawer">
      <Title v-if="currentPage == TBH_PAGES.TITLE" @start="onGameStart" />
      <template v-if="isLoadedFiles">
        <Top
          v-if="currentPage == TBH_PAGES.TOP"
          v-model:timming="timming"
          :player="player"
          @move="onMove"
        />
        <Patrol
          v-else-if="currentPage == TBH_PAGES.PATROL"
          v-model:timming="timming"
          :player="player"
          :sounds="TBH_SOUNDS"
          :characters="TBH_CHARACTERS"
          @success="onMoveTop"
        />
        <Training
          v-else-if="currentPage == TBH_PAGES.TRAINING"
          :player="player"
          :sounds="TBH_SOUNDS"
          :images="TBH_IMAGES"
          @success="onMoveTop"
        />
        <Work
          v-else-if="currentPage == TBH_PAGES.WORK"
          :sounds="TBH_SOUNDS"
          :images="TBH_IMAGES"
          @success="onMoveTop"
        />
        <Shop
          v-else-if="currentPage == TBH_PAGES.SHOP"
          :player="player"
          :items="TBH_ITEMS"
          :sounds="TBH_SOUNDS"
          :images="TBH_IMAGES"
          @success="onMoveTop"
        />
        <Rest
          v-else-if="currentPage == TBH_PAGES.REST"
          :sounds="TBH_SOUNDS"
          :images="TBH_IMAGES"
          @success="onMoveTop"
        />
      </template>
      <Ending
        v-if="currentPage == TBH_PAGES.ENDING && endingType"
        :endingType="endingType"
        :sounds="TBH_SOUNDS"
        @reset="onReset"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Title from "@/components/templates/games/tbh/01_Title.vue";
import Top from "@/components/templates/games/tbh/02_Top.vue";
import Patrol from "@/components/templates/games/tbh/03_1_Patrol.vue";
import Training from "@/components/templates/games/tbh/03_2_Training.vue";
import Work from "@/components/templates/games/tbh/03_3_Work.vue";
import Shop from "@/components/templates/games/tbh/03_4_Shop.vue";
import Rest from "@/components/templates/games/tbh/03_5_Rest.vue";
import Ending from "@/components/templates/games/tbh/04_Ending.vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import { TBH_PAGES } from "@/composables/games/tbh/enums/page";
import { useTbhDisplay } from "@/composables/games/tbh/display";
import { TBH_TIMMINGS } from "@/composables/games/tbh/enums/timming";
import { useTbhMain } from "@/composables/games/tbh/main";
import { useTbhInit } from "@/composables/games/tbh/init";
import { TbhItem } from "@/composables/games/tbh/types/item";

const {
  isLoadedFiles,
  TBH_SOUNDS,
  TBH_IMAGES,
  TBH_ITEMS,
  TBH_CHARACTERS,
  player,
  loadFiles,
} = useTbhInit();
const { currentPage, timming, backgroundLayer } = useTbhDisplay(TBH_IMAGES);
const { endingType, addHistory, isShowEnding, judgeEndingType } = useTbhMain(
  TBH_ITEMS,
  player.value
);
const onGameStart = () => {
  timming.value = TBH_TIMMINGS.OPENING;
  currentPage.value = TBH_PAGES.TOP;
};
const onMove = (id: TBH_PAGES) => {
  currentPage.value = id;
};
const onMoveTop = (fluctuation: {
  stamina?: number;
  power?: number;
  justice?: number;
  life?: number;
  money?: number;
  items?: Array<TbhItem>;
}) => {
  timming.value = TBH_TIMMINGS.TOP;

  // プレイヤーのステータス値更新
  player.value.fluctuateStatus(fluctuation);
  player.value.addItem(fluctuation.items ?? []);

  // 行動履歴登録
  addHistory(currentPage.value);

  // エンディング判定
  if (isShowEnding()) {
    timming.value = TBH_TIMMINGS.ENDING;
    endingType.value = judgeEndingType();
    onMove(TBH_PAGES.ENDING);
    return;
  }

  onMove(TBH_PAGES.TOP);
};
const onReset = () => {};

onMounted(() => {
  loadFiles();
});
</script>

<style scoped lang="scss">
* {
  font-family: monospace;
  font-weight: 600;
}
.c-game {
  position: relative;
  border-style: outset;
  box-sizing: content-box;
  border-color: black;
  margin: auto;
  border-width: 6px;
  &__drawer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
@media screen and (max-width: 350px) {
  .c-game {
    width: 350px;
    height: 350px;
  }
  .c-description {
    width: 350px;
  }
}
@media screen and (max-width: 600px) and (min-width: 350px) {
  .c-game {
    width: 100vw;
    height: 100vw;
  }
  .c-description {
    width: 100vw;
  }
}
@media screen and (min-width: 600px) {
  .c-game {
    width: 600px;
    height: 600px;
  }
  .c-description {
    width: 600px;
  }
}
</style>
