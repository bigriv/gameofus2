<template>
  <div class="c-title">
    <div class="c-title__sanctuary">
      <div class="c-title__sanctuary--entity"></div>
    </div>
    <div class="c-title__sacred_sword">
      <div class="c-title__sacred_sword--entity"></div>
    </div>
    <span class="c-title__text">
      <p>
        <span
          class="c-title__text--kanji c-title__text--piece"
          style="--text: '世界平和'"
          >世界平和</span
        >は
      </p>
      <p>
        その<span
          class="c-title__text--kanji c-title__text--knight"
          style="--text: '聖騎士'"
          >聖騎士</span
        >が<span class="c-title__text--kanji" style="--text: '導'">導</span>く
      </p>
    </span>
    <div class="c-title__buttons">
      <GameButton
        label="さいしょから"
        :fontColor="WIL_BUTTON_FONT_COLOR"
        :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
        class="c-title__buttons__button"
        @click="onStart"
      />
      <GameButton
        label="つづきから"
        :fontColor="WIL_BUTTON_FONT_COLOR"
        :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
        class="c-title__buttons__button"
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
  background: linear-gradient(
    -225deg,
    #ffffff 25%,
    yellow 40%,
    #ffd000 60%,
    #ffffff 90%
  );
  &__sanctuary {
    position: absolute;
    left: 50%;
    top: 2%;
    width: 40%;
    height: 36%;
    transform: translateX(-50%);
    filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.5));
    &--entity {
      width: 100%;
      height: 100%;
      background: radial-gradient(yellow, gold);
      clip-path: polygon(
        50% 0,
        100% 100%,
        50% 100%,
        50% 90%,
        80% 90%,
        50% 20%,
        20% 90%,
        50% 90%,
        50% 100%,
        0 100%
      );
    }
  }
  &__sacred_sword {
    position: absolute;
    right: 6%;
    bottom: -12%;
    width: 20%;
    height: 60%;
    rotate: 20deg;
    filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.5));
    &--entity {
      width: 100%;
      height: 100%;
      background: linear-gradient(
        120deg,
        gold 10%,
        yellow 30%,
        orange 70%,
        black 80%
      );
      clip-path: polygon(
        42% 0,
        58% 0,
        58% 20%,
        100% 20%,
        100% 20%,
        100% 24%,
        60% 24%,
        60% 80%,
        50% 100%,
        40% 80%,
        40% 24%,
        0 24%,
        0 20%,
        42% 20%
      );
      &::after {
        content: "";
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        width: 1px;
        height: 50%;
        background-color: transparent;
        box-shadow: 0 0 4px gray;
      }
    }
  }
  &__text {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    p {
      font-family: "Kaisei Tokumin", sans-serif;
      font-weight: bold;
      text-shadow: 4px 0px 4px black, 0px 4px 4px black;
      color: white;
    }
    &--kanji {
      margin: 0 0.1em;
      text-shadow: none;
      color: transparent;
      position: relative;
      &::before {
        content: var(--text);
        position: absolute;
        top: 0;
        left: 0;
        text-shadow: 4px 4px 4px black;
      }
      &::after {
        content: var(--text);
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(
          -20deg,
          #ff9900 0%,
          #faeb00 50%,
          #ff9900 100%
        );
        color: transparent;
        -webkit-background-clip: text;
      }
    }
  }
  &__buttons {
    position: absolute;
    top: 64%;
    left: 50%;
    width: 25%;
    height: 20%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__button {
      height: 40%;
    }
  }
}
@media screen and (max-width: 400px) {
  .c-title__buttons {
    font-size: 10px;
  }
  .c-title__text {
    font-size: 24px;
    &--kanji {
      font-size: 40px;
    }
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-title__buttons {
    font-size: 12px;
  }
  .c-title__text {
    font-size: 28px;
    &--kanji {
      font-size: 42px;
    }
  }
}
@media screen and (min-width: 600px) {
  .c-title__buttons {
    font-size: 14px;
  }
  .c-title__text {
    font-size: 40px;
    &--kanji {
      font-size: 60px;
    }
  }
}
</style>
