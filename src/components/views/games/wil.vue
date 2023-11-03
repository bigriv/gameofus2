<template>
  <GameFrame>
    <template #window>
      <template v-if="timming == WIL_WINDOW.TITLE">
        <Title />
      </template>
      <template v-else-if="timming == WIL_WINDOW.ENDING">
        <Ending />
      </template>
      <template v-else>
        <Main />
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
import { WIL_WINDOW } from "@/composables/games/wil/enums/window";

const timming = ref(WIL_WINDOW.TITLE);
</script>

<style scoped></style>
