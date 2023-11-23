<template>
  <GameFrame>
    <template #window>
      <template v-if="overallTimming == WIL_OVERALL_TIMMING.TITLE">
        <Title @start="onStart" @continue="onContinue" />
      </template>
      <template v-else-if="overallTimming == WIL_OVERALL_TIMMING.ENDING">
        <Ending />
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
        />
      </template>
    </template>
    <template #description> </template>
  </GameFrame>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GameFrame from "@/components/atoms/frames/GameFrame.vue";
import Title from "@/components/templates/games/wil/01_Title.vue";
import Main from "@/components/templates/games/wil/02_Main.vue";
import Ending from "@/components/templates/games/wil/03_Ending.vue";
import { WIL_OVERALL_TIMMING } from "@/composables/games/wil/enums/timming";

const overallTimming = ref(WIL_OVERALL_TIMMING.TITLE);
const needLoadingData = ref(false);

const onStart = () => {
  needLoadingData.value = false;
  overallTimming.value = WIL_OVERALL_TIMMING.LOADING;
};
const onContinue = () => {
  needLoadingData.value = true;
  overallTimming.value = WIL_OVERALL_TIMMING.LOADING;
};
const loaded = () => {
  overallTimming.value = WIL_OVERALL_TIMMING.MAIN;
};
</script>

<style scoped lang="scss">
:deep(*) {
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
</style>
