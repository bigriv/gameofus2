<template>
  <div class="c-rest">
    <div class="c-rest__character">
      <GOUVisualCanvas :objects="{ sleep: characterVisual }" />
    </div>
    <div class="c-rest__sleep_effect">
      <span v-for="i in state.timer" :key="i"> z </span>
    </div>
    <div v-if="modal.isShown" class="c-rest__dialog">
      <MessageFrame
        :backgroundColor="TBH_MESSAGEFRAME_BACKGROUND_COLOR"
        :borderColor="TBH_MESSAGEFRAME_BORDER_COLOR"
      >
        <div class="c-rest__dialog__message">
          <div class="c-rest__dialog__message__text">
            {{ modal.message }}
          </div>
          <div class="c-rest__dialog__message__button">
            <GameButton
              label="OK"
              :backgroundColor="COLOR.WHITE"
              :borderColor="COLOR.ORANGE"
              @click="modal.onAgree"
            />
          </div>
        </div>
      </MessageFrame>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, PropType } from "vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { COLOR } from "@/composables/types/GOUColor";
import {
  TBH_MESSAGEFRAME_BACKGROUND_COLOR,
  TBH_MESSAGEFRAME_BORDER_COLOR,
} from "@/composables/games/tbh/const";

const props = defineProps({
  sounds: {
    type: Object as PropType<{ [key: string]: GOUReadAudio }>,
    required: true,
  },
  images: {
    type: Object as PropType<{ [key: string]: GOUVisual }>,
    required: true,
  },
});
const emits = defineEmits(["success"]);

const characterVisual = props.images.SLEEP;
let timeoutId: NodeJS.Timeout | undefined = undefined;
let intervalId: NodeJS.Timeout | undefined = undefined;
const state = reactive({
  timer: 0,
});
const modal = reactive({
  isShown: false,
  message: "体力が回復した。",
  onAgree: () => emits("success", { stamina: 20 }),
});

onMounted(() => {
  timeoutId = setTimeout(() => {
    props.sounds.POWERUP.play();

    modal.isShown = true;
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  }, 3900);
  intervalId = setInterval(() => {
    state.timer++;
    props.sounds.SLEEP.play();
  }, 1000);
});
onBeforeUnmount(() => {
  clearTimeout(timeoutId);
  clearInterval(intervalId);
});
</script>

<style scoped lang="scss">
.c-rest {
  &__character {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -100%);
    width: 60%;
    height: 40%;
  }
  &__sleep_effect {
    position: absolute;
    top: 60%;
    left: 10%;
    width: 10%;
    height: 10%;
    span {
      font-weight: bold;
      position: absolute;
      transform: translate(-50%, 50%);
    }
    :nth-child(1) {
      font-size: 28px;
      bottom: 0;
      left: 100%;
    }
    :nth-child(2) {
      font-size: 32px;
      bottom: 50%;
      left: 50%;
    }
    :nth-child(3) {
      font-size: 40px;
      bottom: 100%;
      left: 0;
    }
  }
  &__dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 20%;
    &__message {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      white-space: break-spaces;
      &__button {
        width: 30%;
        height: 30%;
        font-size: 16px;
      }
    }
  }
}
</style>
