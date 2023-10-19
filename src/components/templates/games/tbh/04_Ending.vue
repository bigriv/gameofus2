<template>
  <div class="c-ending" :class="state.color">
    <div class="c-ending__text">{{ state.title }}</div>
    <div class="c-ending__message">{{ state.message }}</div>
    <div class="c-ending__buttons">
      <MessageFrame>
        <div class="c-ending__buttons--reset">
          <GameButton
            label="タイトルに戻る"
            :backgroundColor="COLOR.WHITE"
            :borderColor="COLOR.ORANGE"
            :sounds="{ click: props.sounds.BUTTON }"
            @click="onReset"
          />
        </div>
      </MessageFrame>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, onMounted, reactive } from "vue";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import TBH_MESSAGE from "@/composables/games/tbh/defines/message";
import { TBH_ENDINGS } from "@/composables/games/tbh/enums/ending";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { COLOR } from "@/composables/types/GOUColor";

const props = defineProps({
  endingType: {
    type: String as PropType<TBH_ENDINGS>,
    required: true,
  },
  sounds: {
    type: Object as PropType<{ [key: string]: GOUReadAudio }>,
    required: true,
  },
});
const emits = defineEmits(["reset"]);

const state = reactive({
  title: "",
  message: "",
  color: "",
});

onMounted(() => {
  state.message = TBH_MESSAGE[props.endingType] ?? "";
  if (/^HAPPY_END/.test(props.endingType)) {
    state.title = "HAPPY END";
    state.color = "yellow";
    if (props.sounds.HAPPYEND) {
      props.sounds.HAPPYEND.play();
    }
    return;
  }
  if (/^TRUE_END/.test(props.endingType)) {
    state.title = "TRUE END";
    state.color = "white";
    if (props.sounds.FANFARE) {
      props.sounds.FANFARE.play();
    }
    return;
  }
  if (/^BAD_END/.test(props.endingType)) {
    state.title = "BAD END";
    state.color = "black";
    if (props.sounds.BADEND) {
      props.sounds.BADEND.play();
    }
    return;
  }
});

const onReset = () => {
  emits("reset");
};
</script>

<style scoped lang="scss">
.c-ending {
  width: 100%;
  height: 100%;
  font-family: "Reggae One";
  &.black {
    background-color: black;
    color: white;
  }
  &.white {
    background-color: white;
    color: black;
  }
  &.yellow {
    background-color: yellow;
    color: red;
  }
  background-color: black;
  &__text {
    position: absolute;
    top: 25%;
    left: 50%;
    width: 100%;
    text-align: center;
    transform: translate(-50%, -50%);
  }
  &__message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    text-align: center;
  }

  &__buttons {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 34%;
    height: 12%;
    &--reset {
      width: 100%;
      height: 100%;
    }
  }
}
@media screen and (max-width: 400px) {
  .c-ending__text {
    font-size: 40px;
  }
  .c-ending__message {
    font-size: 18px;
  }
  .c-ending__buttons {
    font-size: 14px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-ending__text {
    font-size: 48px;
  }
  .c-ending__message {
    font-size: 24px;
  }
  .c-ending__buttons {
    font-size: 16px;
  }
}
@media screen and (min-width: 600px) {
  .c-ending__text {
    font-size: 72px;
  }
  .c-ending__message {
    font-size: 30px;
  }
  .c-ending__buttons {
    font-size: 20px;
  }
}
</style>
