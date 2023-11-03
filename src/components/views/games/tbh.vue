<template>
  <GameFrame>
    <template #window>
      <div class="c-game__window__drawer">
        <GOUVisualCanvas :objects="backgroundLayer" />
      </div>
      <div class="c-game__window__drawer">
        <template v-if="isLoadedFiles">
          <Title
            v-if="currentPage == TBH_PAGES.TITLE"
            :sounds="TBH_SOUNDS"
            @start="onGameStart"
          />
          <Top
            v-else-if="currentPage == TBH_PAGES.TOP"
            v-model:timming="timming"
            :player="player"
            :sounds="TBH_SOUNDS"
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
          <Ending
            v-else-if="currentPage == TBH_PAGES.ENDING && endingType"
            :endingType="endingType"
            :sounds="TBH_SOUNDS"
            @reset="onReset"
          />
        </template>
      </div>
    </template>
    <template #description>
      <div class="c-game__description__block">
        <h2>リリースノート</h2>
        <p>2023/10/20 ver 1.00 リリース</p>
      </div>

      <div class="c-game__description__block">
        <h2>あらすじ</h2>
        <p>
          主人公はしがないフリーター。<br />
          平穏な日々を暮らしていたが、ある日近所にヤンキーがうろつき始めた。<br />
          街の平和を守るため、主人公は子供のころ憧れていたヒーローを目指すことを決める。<br />
          主人公を立派なヒーローに育て上げ、街の平和を守りましょう！<br />
        </p>
      </div>

      <div class="c-game__description__block">
        <h2>説明</h2>
        <p>操作方法はクリックのみです。</p>
        <p>セーブ機能はありません</p>
        <p>エンディングは全12種類です。</p>
        <p>
          ※不具合のため、スマートフォンではプレイできない可能性があります。（修正中）
        </p>
      </div>

      <div class="c-game__description__block">
        <h2>推定プレイ時間</h2>
        <p>10分</p>
      </div>
    </template>
  </GameFrame>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useDisplayStore } from "@/pinia/display";
import GameFrame from "@/components/atoms/frames/GameFrame.vue";
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
const store = useDisplayStore();

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
const onReset = () => {
  console.log("reload");
  store.refleshStart();
};

onMounted(() => {
  loadFiles();
});
</script>

<style scoped lang="scss">
.c-game {
  &__window {
    &__drawer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>
