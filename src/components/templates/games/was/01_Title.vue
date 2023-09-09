<template>
  <div class="c-game__drawer">
    <span class="c-game__drawer__title"> 魔王になっちゃった！？ </span>
    <div class="c-game__drawer__buttons">
      <GameButton
        label="さいしょから"
        :fontColor="COLOR.WHITE"
        :backgroundColor="COLOR.BLACK"
        class="c-game__drawer__buttons__button--start"
        @click="onStart"
      />
      <GameButton
        label="つづきから"
        :fontColor="COLOR.WHITE"
        :backgroundColor="COLOR.BLACK"
        class="c-game__drawer__buttons__button--continue"
        @click="onContinue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import { COLOR } from "@/composables/types/GOUColor";

const emits = defineEmits(["start", "load"]);
const onStart = () => {
  emits("start");
};

const onContinue = () => {
  emits("load");
};
</script>

<style scoped lang="scss">
.c-game__drawer {
  position: absolute;
  width: 600rem;
  height: 600rem;
  background-color: #4b0082;
  &__title {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    font-family: "Yusei Magic";
    font-size: 40rem;
    color: white;
    text-shadow: 8rem 8rem black;
  }
  &__buttons {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20%;
    height: 15%;
    transform: translate(-50%, -50%);
    font-size: 14rem;
    &__button--start {
      position: absolute;
      top: 0%;
      left: 50%;
      width: 100%;
      height: 50%;
      transform: translate(-50%, -50%);
    }
    &__button--continue {
      position: absolute;
      top: 100%;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
