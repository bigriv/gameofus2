<template>
  <div class="c-game__drawer">
    <span class="c-game__drawer__title"> 僕が魔王！？ </span>
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
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #4b0082;
  &__title {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    font-family: "Yusei Magic";
    font-size: 40px;
    color: white;
    text-shadow: 6px 6px 2px black;
    user-select: none;
  }
  &__buttons {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 15%;
    transform: translate(-50%, -50%);
    font-size: 14px;
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
@media screen and (max-width: 400px) {
  .c-game__drawer__buttons {
    font-size: 10px;
    width: 25%;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-game__drawer__buttons {
    font-size: 12px;
    width: 23%;
  }
}
@media screen and (min-width: 600px) {
  .c-game__drawer__buttons {
    font-size: 14px;
    width: 20%;
  }
}
</style>
