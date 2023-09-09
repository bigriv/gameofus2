<template>
  <div>
    <input type="radio" name="display" v-model="ending.type" value="good" />
    <input type="radio" name="display" v-model="ending.type" value="bad" />
    <input type="radio" name="display" v-model="ending.type" value="dead" />
  </div>

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
      :type="ending.type"
      @back="onBackTitle"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Title from "@/components/templates/games/was/01_Title.vue";
import Main from "@/components/templates/games/was/02_Main.vue";
import Ending from "@/components/templates/games/was/03_Ending.vue";

const display = ref("title");
const ending = reactive({
  type: "",
});

const onStart = () => {
  display.value = "main";
};
const onLoad = () => {
  display.value = "main";
};
const onEnd = (endType: string) => {
  console.log(endType);
  ending.type = endType;
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
