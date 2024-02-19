<template>
  <GameFrame>
    <template #window>
      <template v-if="overallTimming == WIL_OVERALL_TIMMING.TITLE">
        <Title @start="onStart" @continue="onContinue" />
      </template>
      <template v-else-if="overallTimming == WIL_OVERALL_TIMMING.ENDING">
        <Ending v-if="ending" :ending="ending" @end="onBackTitle" />
      </template>
      <template
        v-else-if="
          overallTimming == WIL_OVERALL_TIMMING.FILE_LOADING ||
          overallTimming == WIL_OVERALL_TIMMING.SAVE_LOADING
        "
      >
        <div class="c-drawer u-d_flex--v_center">
          <div class="c-drawer__loading">Now Loading...</div>
        </div>
      </template>
      <template
        v-if="
          overallTimming == WIL_OVERALL_TIMMING.MAIN ||
          overallTimming == WIL_OVERALL_TIMMING.SAVE_LOADING
        "
      >
        <Main
          :start="overallTimming == WIL_OVERALL_TIMMING.MAIN"
          :loadData="needLoadingData"
          @loaded="loaded"
          @end="onShowEnding"
        />
      </template>
    </template>
    <template #description>
      <div class="c-game__description__block">
        <h2>説明</h2>
        <p>操作方法はクリックのみです。</p>
        <p>セーブは一部の戦闘終了後及び訓練前後に任意で行えます。</p>
        <p>エンディングは一種類のみです。</p>
      </div>

      <div class="c-game__description__block">
        <h2>推定プレイ時間</h2>
        <p>1~2時間</p>
      </div>

      <div class="c-game__description__block">
        <h2>仕様素材一覧</h2>
        <p>エンドクレジットに記載</p>
      </div>

      <div class="c-game__description__block">
        <h2>リリースノート</h2>
        <p>2024/02/19 ver 1.01 3章の戦闘時にフリーズが発生する不具合を修正</p>
        <p>2024/02/17 ver 1.00 リリース</p>
      </div>

      <div class="c-game__description__block">
        <h2><GameContactForm /></h2>
      </div>
    </template>
  </GameFrame>
</template>

<script setup lang="ts">
import { Ref, onMounted, onUnmounted, ref, watch } from "vue";
import { useGameStore } from "@/pinia/game";
import GameFrame from "@/components/atoms/frames/GameFrame.vue";
import Title from "@/components/templates/games/wil/01_Title.vue";
import Main from "@/components/templates/games/wil/02_Main.vue";
import Ending from "@/components/templates/games/wil/03_Ending.vue";
import GameContactForm from "@/components/atoms/interfaces/GameContactForm.vue";
import { useWilFile } from "@/composables/games/wil/file";
import { WIL_OVERALL_TIMMING } from "@/composables/games/wil/enums/timming";
import { WIL_ENDING_ID } from "@/composables/games/wil/enums/ending";

const gameStore = useGameStore();

const { WIL_IMAGES, WIL_SOUNDS, isLoadedImages, loadImages } = useWilFile();

const overallTimming = ref(WIL_OVERALL_TIMMING.FILE_LOADING);
const needLoadingData = ref(false);
const ending: Ref<WIL_ENDING_ID | undefined> = ref();

const onStart = () => {
  needLoadingData.value = false;
  overallTimming.value = WIL_OVERALL_TIMMING.MAIN;
};
const onContinue = () => {
  needLoadingData.value = true;
  overallTimming.value = WIL_OVERALL_TIMMING.SAVE_LOADING;
};
const onShowEnding = (endingId: WIL_ENDING_ID) => {
  ending.value = endingId;
  overallTimming.value = WIL_OVERALL_TIMMING.ENDING;
};
const onBackTitle = () => {
  ending.value = undefined;
  overallTimming.value = WIL_OVERALL_TIMMING.TITLE;
};
const loaded = () => {
  overallTimming.value = WIL_OVERALL_TIMMING.MAIN;
};

onMounted(() => {
  loadImages();
  gameStore.setImages(WIL_IMAGES);
  gameStore.setSounds(WIL_SOUNDS);
});
onUnmounted(() => {
  gameStore.resetImages();
  gameStore.resetSounds();
});
watch(
  () => isLoadedImages.value,
  () => {
    overallTimming.value = WIL_OVERALL_TIMMING.TITLE;
  }
);
</script>

<style scoped lang="scss">
:deep(.c-game__window) {
  font-family: "DotGothic16", sans-serif;
}
.c-drawer {
  &__loading {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: white;
  }
}
.c-game__description__block {
  margin-top: 20px;
}
</style>
