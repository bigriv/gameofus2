<template>
  <div class="c-title">
    <span class="c-title__text">聖騎士と五つの国</span>
    <div class="c-title__buttons">
      <GameButton
        label="さいしょから"
        :fontColor="WIL_BUTTON_FONT_COLOR"
        :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
        class="c-title__buttons__button--start"
        @click="onStart"
      />
      <GameButton
        label="つづきから"
        :fontColor="WIL_BUTTON_FONT_COLOR"
        :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
        class="c-title__buttons__button--continue"
        @click="onContinue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import {
  WIL_BUTTON_FONT_COLOR,
  WIL_BUTTON_BACKGROUND_COLOR,
} from "@/composables/games/wil/const";

const emits = defineEmits(["start", "continue"]);
const onStart = () => {
  emits("start");
};
const onContinue = () => {
  emits("continue");
};
</script>

<style scoped lang="scss">
.c-title {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(170deg, #ffffff 30%, #ffd000 70%, #ffffff 100%);
  &__text {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    font-family: "Yusei Magic";
    background: linear-gradient(0deg, #ff9900 0%, #faeb00 50%, #ff9900 100%);
    background: -webkit-linear-gradient(
      0deg,
      #ff9900 0%,
      #faeb00 50%,
      #ff9900 100%
    );
    color: transparent;
    -webkit-background-clip: text;
    text-shadow: 0px 0px 20px white;
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
  .c-title__buttons {
    font-size: 10px;
    width: 25%;
  }
  .c-title__text {
    font-size: 30px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-title__buttons {
    font-size: 12px;
    width: 23%;
  }
  .c-title__text {
    font-size: 40px;
  }
}
@media screen and (min-width: 600px) {
  .c-title__buttons {
    font-size: 14px;
    width: 20%;
  }
  .c-title__text {
    font-size: 50px;
  }
}
</style>
