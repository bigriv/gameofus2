<template>
  <div class="c-talk">
    <div class="c-talk__background">
      <GOUVisualCanvas :objects="{ background: background }" />
    </div>
    <div class="c-talk__character--left">
      <GOUVisualCanvas :objects="{ character: character.left }" />
    </div>
    <div class="c-talk__character--right">
      <GOUVisualCanvas :objects="{ character: character.right }" />
    </div>
    <div class="c-talk__message">
      <MessageFrame
        v-model:complete="isEndMessage"
        :messages="message"
        :fontColor="COLOR.WHITE"
        :backgroundColor="MESSAGE_BACKGROUND_COLOR"
        :borderColor="MESSAGE_BORDER_COLOR"
        :speed="1"
        :clickable="message.length > 0"
        vertical="start"
        horizontal="start"
        @click="onClickMessageFrame"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, reactive, ref } from "vue";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import { COLOR, GOUColor } from "@/composables/types/GOUColor";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
const emits = defineEmits(["end"]);

const background: Ref<GOUVisual | undefined> = ref();
const character: { left: GOUVisual | undefined; right: GOUVisual | undefined } =
  reactive({
    left: undefined,
    right: undefined,
  });

const message = ref(["メッセージ"]);
const isEndMessage = ref(false);
const MESSAGE_BACKGROUND_COLOR = new GOUColor(COLOR.BLACK, 0.8);
const MESSAGE_BORDER_COLOR = new GOUColor(COLOR.LIGHT_GRAY);
const onClickMessageFrame = () => {
  console.log("onClickMessageFrame");
  emits("end");
};
</script>

<style scoped lang="scss">
.c-talk {
  position: relative;
  width: 100%;
  height: 100%;
  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  &__character {
    &--left {
      position: absolute;
      bottom: 2%;
      right: 2%;
      width: 35%;
      height: 70%;
      background-color: red;
    }
    &--right {
      position: absolute;
      bottom: 2%;
      left: 2%;
      width: 35%;
      height: 70%;
      z-index: 2;
      background-color: blue;
    }
  }
  &__message {
    position: absolute;
    bottom: 5%;
    left: 5%;
    width: 90%;
    height: 25%;
    z-index: 3;
  }
}
@media screen and (max-width: 400px) {
  .c-talk__message {
    font-size: 10px;
  }
}
@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-talk__message {
    font-size: 12px;
  }
}
@media screen and (min-width: 600px) {
  .c-talk__message {
    font-size: 14px;
  }
}
</style>
