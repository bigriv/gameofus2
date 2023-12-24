<template>
  <div class="c-ending" :class="css">
    <div class="c-ending__text">{{ text }}</div>
    <div class="c-ending__button">
      <GameButton
        label="タイトルへ"
        :fontColor="WIL_BUTTON_FONT_COLOR"
        :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
        @click="onClickBack"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import { WIL_ENDING_ID } from "@/composables/games/wil/enums/ending";
import { PropType, computed } from "vue";
import {
  WIL_BUTTON_FONT_COLOR,
  WIL_BUTTON_BACKGROUND_COLOR,
} from "@/composables/games/wil/const";

const props = defineProps({
  ending: {
    type: String as PropType<WIL_ENDING_ID>,
    required: true,
  },
});
const emits = defineEmits(["end"]);

const text = computed(() => {
  switch (props.ending) {
    case WIL_ENDING_ID.GAME_OVER:
      return "GAME OVER";
    case WIL_ENDING_ID.TO_BE_CONTINUED:
      return "TO BE CONTINUED";
  }
});
const css = computed(() => {
  switch (props.ending) {
    case WIL_ENDING_ID.GAME_OVER:
      return "c-ending--game_over";
    case WIL_ENDING_ID.TO_BE_CONTINUED:
      return "c-ending--to_be_continued";
  }
});
const onClickBack = () => {
  emits("end");
};
</script>

<style scoped lang="scss">
.c-ending {
  position: relative;
  width: 100%;
  height: 100%;
  &__text {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
  }
  &--game_over {
    background: black;
    .c-ending__text {
      color: white;
      font-family: "DotGothic16";
    }
  }
  &--to_be_continued {
    background: linear-gradient(170deg, #ffffff 30%, #ffd000 70%, #ffffff 100%);
    .c-ending__text {
      font-family: "DotGothic16";
      color: black;
    }
  }
  &__button {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 10%;
    transform: translate(-50%, -50%);
    font-size: 14px;
  }
}
@media screen and (max-width: 400px) {
  .c-ending__button {
    font-size: 10px;
    width: 25%;
  }
  .c-ending__text {
    font-size: 30px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-ending__button {
    font-size: 12px;
    width: 23%;
  }
  .c-ending__text {
    font-size: 40px;
  }
}
@media screen and (min-width: 600px) {
  .c-ending__button {
    font-size: 14px;
    width: 20%;
  }
  .c-ending__text {
    font-size: 50px;
  }
}
</style>
