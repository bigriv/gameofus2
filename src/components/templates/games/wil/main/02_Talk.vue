<template>
  <div class="c-talk">
    <div class="c-talk__background">
      <GOUVisualCanvas :objects="{ background: background }" />
    </div>
    <div v-if="characters.left" class="c-talk__character--left">
      <GOUVisualCanvas :objects="{ character: characters.left }" />
    </div>
    <div v-if="characters.right" class="c-talk__character--right">
      <GOUVisualCanvas :objects="{ character: characters.right }" />
    </div>
    <div v-if="talker" class="c-talk__talker">
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
        @click="() => onClickMessageFrame()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, onMounted, reactive, ref } from "vue";
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
  images: {
    type: Object as PropType<{ [key: string]: GOUVisual }>,
    required: true,
  },
  events: {
    type: Array<WilTalkEvent>,
    default: () => [],
  },
});
const emits = defineEmits(["end"]);

const background: Ref<GOUVisual | undefined> = ref();

const message: Ref<Array<string>> = ref([]);
const talker: Ref<Array<string>> = ref([]);
const characters: {
  left?: GOUVisual;
  right?: GOUVisual;
} = reactive({
  left: undefined,
  right: undefined,
});
const onClickMessageFrame: Ref<Function> = ref(() => {});
const isEndMessage = ref(false);

const chainEvent: Function = (
  events: Array<WilTalkEvent>,
  afterFunction: Function
) => {
  const event = events.shift();
  if (!event) {
    talker.value = [];
    message.value = [];
    onClickMessageFrame.value = () => {};
    return;
  }
  message.value = event.message ?? [];
  if (event.sound) {
    event.sound.play();
  }
  talker.value = event.talker ? [event.talker] : [];
  characters.left = event.left ? props.images[event.left] : undefined;
  characters.right = event.right ? props.images[event.right] : undefined;

  onClickMessageFrame.value = () => chainEvent(events, afterFunction);
};

onMounted(() => {
  console.log(props.events)
  chainEvent([...props.events], emits("end"));
});
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
