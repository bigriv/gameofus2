<template>
  <div v-if="isShow" class="c-dialog_backgrond"></div>
  <transition>
    <div v-show="isShow" class="c-confirm_dialog">
      <MessageFrame
        :fontColor="WIL_FRAME_FONT_COLOR"
        :backgroundColor="WIL_FRAME_BACKGROUND_COLOR"
        :borderColor="WIL_FRAME_BORDER_COLOR"
      >
        <div class="c-confirm_dialog__inner">
          <div ref="logElement" class="c-confirm_dialog__inner__message">
            <p v-for="message in log">
              {{ message }}
            </p>
          </div>
          <div class="c-confirm_dialog__inner__buttons">
            <GameButton
              label="閉じる"
              :fontColor="WIL_BUTTON_FONT_COLOR"
              :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
              @click="onClose"
            />
          </div>
        </div>
      </MessageFrame>
    </div>
  </transition>
</template>

<script setup lang="ts">
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import {
  WIL_FRAME_FONT_COLOR,
  WIL_FRAME_BORDER_COLOR,
  WIL_FRAME_BACKGROUND_COLOR,
  WIL_BUTTON_FONT_COLOR,
  WIL_BUTTON_BACKGROUND_COLOR,
} from "@/composables/games/wil/const";
import { computed, ref } from "vue";

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
  log: {
    type: Array<string>,
    default: () => {},
  },
});

const emits = defineEmits(["update:isShow"]);

const isShow = computed({
  get: () => props.isShow,
  set: (newValue: boolean) => emits("update:isShow", newValue),
});
const log = computed(() => props.log);
const logElement = ref();

const onClose = () => {
  isShow.value = false;
};
</script>

<style scoped lang="scss">
.c-confirm_dialog {
  width: 90%;
  height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    padding: 2%;
    &__message {
      text-align: left;
      height: 80%;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background-color: #e4e4e4;
        border-radius: 8px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: gray;
        border-radius: 8px;
      }
    }
    &__buttons {
      margin-top: 8%;
      display: flex;
      justify-content: space-around;
      > div {
        width: 36%;
      }
    }
  }
}
.c-dialog_backgrond {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.v-enter-active,
.v-leave-active {
  transition: height 0.2s ease;
}
.v-enter-from,
.v-leave-to {
  height: 0;
}
</style>
