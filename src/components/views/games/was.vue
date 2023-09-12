<template>
  <div class="c-game">
    <Title
      v-if="display === 'title'"
      v-model="display"
      @start="onStart"
      @load="onLoad"
    />
    <Main v-else-if="display === 'main'" @end="onEnd" />
    <Ending
      v-else-if="display === 'end'"
      :type="endingType"
      @back="onBackTitle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Title from "@/components/templates/games/was/01_Title.vue";
import Main from "@/components/templates/games/was/02_Main.vue";
import Ending from "@/components/templates/games/was/03_Ending.vue";
import { WAS_ENDING } from "@/composables/games/was/const";

const display = ref("title");
const endingType = ref();

const onStart = () => {
  display.value = "main";
};
const onLoad = () => {
  display.value = "main";
};
const onEnd = (type: WAS_ENDING) => {
  console.log(type);
  endingType.value = type;
  display.value = "end";
};
const onBackTitle = () => {
  display.value = "title";
};
</script>

<style scoped lang="scss">
.c-game {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
