<template>
  <div v-if="talk" class="c-talk">
    <div class="c-talk__background">
      <GOUVisualCanvas :objects="{ background: talk.background }" />
    </div>
    <div v-if="talk.left" class="c-talk__character--left">
      <GOUVisualCanvas :objects="{ character: talk.left }" />
    </div>
    <div v-if="talk.right" class="c-talk__character--right">
      <GOUVisualCanvas :objects="{ character: talk.right }" />
    </div>
    <div class="c-talk__talker">
      <MessageFrame
        :noAnimation="true"
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
        :messages="talk.message"
        :fontColor="WIL_FRAME_FONT_COLOR"
        :backgroundColor="WIL_FRAME_BACKGROUND_COLOR"
        :borderColor="WIL_FRAME_BORDER_COLOR"
        :speed="2"
        :clickable="talk.message && talk.message.length > 0"
        vertical="start"
        horizontal="start"
        @click="() => onClickMessageFrame()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, computed, onMounted, onUnmounted, ref } from "vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import {
  WIL_FRAME_FONT_COLOR,
  WIL_FRAME_BORDER_COLOR,
  WIL_FRAME_BACKGROUND_COLOR,
} from "@/composables/games/wil/const";
import { WilTalkEvent } from "@/composables/games/wil/types/event";

const props = defineProps({
  events: {
    type: Array<WilTalkEvent>,
    default: () => [],
  },
});
const emits = defineEmits(["end"]);

const talk: Ref<WilTalkEvent | undefined> = ref();
const talker = computed(() => {
  if (!talk.value?.talker) {
    return [];
  }
  return [talk.value.talker];
});
let bgm: GOUReadAudio | undefined = undefined;
const onClickMessageFrame: Ref<Function> = ref(() => {});
const isEndMessage = ref(false);

const chainTalkEvent: Function = (
  events: Array<WilTalkEvent>,
  afterFunction: Function
) => {
  const event = events.shift();
  if (!event) {
    talk.value = undefined;
    onClickMessageFrame.value = () => {};
    afterFunction();
    return;
  }
  talk.value = event;
  talk.value.process(bgm);
  if (talk.value.bgm) {
    bgm = talk.value.bgm;
  }

  onClickMessageFrame.value = () => chainTalkEvent(events, afterFunction);
};

onMounted(() => {
  chainTalkEvent([...props.events], () => emits("end"));
});
onUnmounted(() => {
  if (bgm && bgm.isPlaying()) {
    bgm?.stop();
  }
});
</script>

<style scoped lang="scss">
.c-talk {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
    font-size: 8px;
  }
}
@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-talk__talker,
  .c-talk__message {
    font-size: 10px;
  }
}
@media screen and (min-width: 600px) {
  .c-talk__talker,
  .c-talk__message {
    font-size: 14px;
  }
}
</style>
