<template>
  <GameFrame>
    <template #window>
      <template v-if="showWindow == WIL_FLOW_TIMMING.TITLE">
        <Title @start="onStart" @continue="onContinue" />
      </template>
      <template v-else-if="showWindow == WIL_FLOW_TIMMING.ENDING">
        <Ending />
      </template>
      <template v-else>
        <Main :loadData="needLoadingData" />
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
import { WIL_FLOW_TIMMING } from "@/composables/games/wil/enums/timming";

const showWindow = ref(WIL_FLOW_TIMMING.TITLE);
const needLoadingData = ref(false);

const onStart = () => {
  needLoadingData.value = false;
  showWindow.value = WIL_FLOW_TIMMING.MAIN;
};
const onContinue = () => {
  needLoadingData.value = true;
  showWindow.value = WIL_FLOW_TIMMING.MAIN;
};
</script>

<style scoped>
:deep(*) {
  font-family: "DotGothic16";
}
</style>
