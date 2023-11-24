<template>
  <div class="c-talk">
    <div class="c-talk__background">
      <GOUVisualCanvas :objects="{ background: background }" />
    </div>
    <div class="c-talk__character--left">
      <GOUVisualCanvas :objects="{ character: props.left }" />
    </div>
    <div class="c-talk__character--right">
      <GOUVisualCanvas :objects="{ character: props.right }" />
    </div>
    <div v-if="event.talker" class="c-talk__talker">
      <MessageFrame
        :complete="true"
        :messages="talker"
        :fontColor="WIL_FRAME_FONT_COLOR"
        :backgroundColor="WIL_FRAME_BACKGROUND_COLOR"
        :borderColor="WIL_FRAME_BORDER_COLOR"
        vertical="center"
        horizontal="start"
      />
    </div>
    <div class="c-talk__message">
      <MessageFrame
        v-model:complete="isEndMessage"
        :messages="message"
        :fontColor="WIL_FRAME_FONT_COLOR"
        :backgroundColor="WIL_FRAME_BACKGROUND_COLOR"
        :borderColor="WIL_FRAME_BORDER_COLOR"
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
import { PropType, Ref, computed, ref } from "vue";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WilTalkEvent } from "@/composables/games/wil/types/event";
import {
  WIL_FRAME_FONT_COLOR,
  WIL_FRAME_BORDER_COLOR,
  WIL_FRAME_BACKGROUND_COLOR,
} from "@/composables/games/wil/const";

const props = defineProps({
  left: {
    type: Object as PropType<GOUVisual>,
    default: undefined,
  },
  right: {
    type: Object as PropType<GOUVisual>,
    default: undefined,
  },
  event: {
    type: WilTalkEvent,
    default: () => {},
  },
});
const emits = defineEmits(["end"]);

const background: Ref<GOUVisual | undefined> = ref();

const message = computed(() => {
  if (!props.event.message) {
    return [];
  }
  return props.event.message;
});
const talker = computed(() => {
  if (!props.event.talker) {
    return undefined;
  }
  return [props.event.talker];
});
const isEndMessage = ref(false);

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
      left: 2%;
      width: 35%;
      height: 70%;
      transform: scaleX(-1);
    }
    &--right {
      position: absolute;
      bottom: 2%;
      right: 2%;
      width: 35%;
      height: 70%;
      z-index: 2;
    }
  }
  &__talker {
    position: absolute;
    bottom: 30%;
    left: 5%;
    width: 90%;
    height: 5%;
    z-index: 3;
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
  .c-talk__talker,
  .c-talk__message {
    font-size: 10px;
  }
}
@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-talk__talker,
  .c-talk__message {
    font-size: 12px;
  }
}
@media screen and (min-width: 600px) {
  .c-talk__talker,
  .c-talk__message {
    font-size: 14px;
  }
}
</style>
