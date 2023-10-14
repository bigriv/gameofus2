<template>
  <div
    class="c-lottie_canvas"
    :style="{
      width: props.object.width + '%',
      height: props.object.height + '%',
      '--x': props.object.position.px,
      '--y': props.object.position.py,
      'z-index': props.zIndex,
    }"
  >
    <LottieAnimation
      v-if="props.object.object"
      :animation-data="props.object.object"
      :auto-play="true"
      :loop="props.object.loop"
      :speed="props.object.speed"
      class="c-lottie_canvas__icon"
      :style="{
        '--duration': props.object.animation?.duration + 's',
        '--iteration': props.object.animation?.iteration,
      }"
      :class="
        !props.object.animation
          ? ''
          : [
              `a-${props.object.animation?.type}`,
              { 'a-infinite': props.object.animation?.iteration <= 0 },
            ]
      "
    />
  </div>
</template>

<script setup lang="ts">
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import { LottieAnimation } from "lottie-web-vue";
import { PropType } from "vue";

const props = defineProps({
  object: {
    type: Object as PropType<GOULottie>,
    required: true,
  },
  zIndex: {
    type: Number,
    default: undefined,
  },
});
</script>

<style scoped lang="scss">
.c-lottie_canvas {
  position: absolute;
  top: calc(var(--y) * 1%);
  left: calc(var(--x) * 1%);
  &__icon {
    width: 100%;
    height: 100%;
  }
}
</style>
