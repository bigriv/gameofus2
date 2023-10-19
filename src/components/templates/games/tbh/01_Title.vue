<template>
  <div class="c-title">
    <div class="c-title__text">ヒーローになろう</div>
    <div class="c-title__buttons">
      <MessageFrame>
        <div class="c-title__buttons--start">
          <GameButton
            label="はじめる"
            :backgroundColor="COLOR.WHITE"
            :borderColor="COLOR.ORANGE"
            :sounds="buttonSounds"
            @click="onStart"
          />
        </div>
      </MessageFrame>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { COLOR } from "@/composables/types/GOUColor";

const props = defineProps({
  sounds: {
    type: Object as PropType<{ [key: string]: GOUReadAudio }>,
    required: true,
  },
});
const emits = defineEmits(["start"]);

const buttonSounds = { click: props.sounds.BUTTON };

const onStart = () => {
  emits("start");
};
</script>

<style scoped lang="scss">
.c-title {
  background: linear-gradient(white, red);
  width: 100%;
  height: 100%;
  &__text {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    font-family: "Reggae One";
    color: white;
    -webkit-text-stroke: black 1px;
    user-select: none;
  }
  &__buttons {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 12%;
    &--start {
      width: 100%;
      height: 100%;
    }
  }
}
@media screen and (max-width: 400px) {
  .c-title__text {
    font-size: 40px;
  }
  .c-title__buttons {
    font-size: 14px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-title__text {
    font-size: 48px;
  }
  .c-title__buttons {
    font-size: 16px;
  }
}
@media screen and (min-width: 600px) {
  .c-title__text {
    font-size: 72px;
  }
  .c-title__buttons {
    font-size: 20px;
  }
}
</style>
