<template>
  <GameFrame>
    <template #window>
      <template v-if="overallTimming == WIL_OVERALL_TIMMING.TITLE">
        <Title @start="onStart" @continue="onContinue" />
      </template>
      <template v-else-if="overallTimming == WIL_OVERALL_TIMMING.ENDING">
        <Ending v-if="ending" :ending="ending" @end="onBackTitle" />
      </template>
      <template v-else-if="overallTimming == WIL_OVERALL_TIMMING.LOADING">
        <div class="c-drawer">
          <div class="c-drawer__loading">Now Loading...</div>
        </div>
      </template>
      <template
        v-if="
          overallTimming == WIL_OVERALL_TIMMING.LOADING ||
          overallTimming == WIL_OVERALL_TIMMING.MAIN
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
        <p>ベータ版のため、プレイできるのは序盤のみとなります。</p>
        <p>操作方法はクリックのみです。</p>
        <p>セーブは戦闘終了後、訓練終了後に任意で行えます。</p>
      </div>

      <div class="c-game__description__block">
        <h2>推定プレイ時間</h2>
        <p>10分（ベータ版）</p>
      </div>

      <div class="c-game__description__block">
        <h2>素材</h2>
        <p>
          SE:
          <a
            href="https://soundeffect-lab.info/"
            target="_blank"
            rel="noopener noreferrer"
            >効果音ラボ</a
          >様
        </p>
        <p>
          BGM:
          <a
            href="https://maou.audio/"
            target="_blank"
            rel="noopener noreferrer"
            >魔王魂</a
          >様
        </p>
        <p>キャラクターイラスト: よしを</p>
        <p>背景イラスト: よしを</p>
      </div>

      <div class="c-game__description__block">
        <h2>リリースノート</h2>
        <p>2024/01/07 ver 0.90 ベータ版リリース（一章のみ）</p>
      </div>
    </template>
  </GameFrame>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import GameFrame from "@/components/atoms/frames/GameFrame.vue";
import Title from "@/components/templates/games/wil/01_Title.vue";
import Main from "@/components/templates/games/wil/02_Main.vue";
import Ending from "@/components/templates/games/wil/03_Ending.vue";
import { WIL_OVERALL_TIMMING } from "@/composables/games/wil/enums/timming";
import { WIL_ENDING_ID } from "@/composables/games/wil/enums/ending";

const overallTimming = ref(WIL_OVERALL_TIMMING.TITLE);
const needLoadingData = ref(false);
const ending: Ref<WIL_ENDING_ID | undefined> = ref();

const onStart = () => {
  needLoadingData.value = false;
  overallTimming.value = WIL_OVERALL_TIMMING.LOADING;
};
const onContinue = () => {
  needLoadingData.value = true;
  overallTimming.value = WIL_OVERALL_TIMMING.LOADING;
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
</script>

<style scoped lang="scss">
:deep(.c-game__window) {
  font-family: "DotGothic16";
}
.c-drawer {
  width: 100%;
  height: 100%;
  background-color: black;
  &__loading {
    margin-inline: auto;
  }
}
.c-game__description__block {
  margin-top: 20px;
}
</style>
