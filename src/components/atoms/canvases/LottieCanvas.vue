<template>
  <div
    class="c-lottie_canvas"
    :style="{
      width: props.width + 'rem',
      height: props.height + 'rem',
      'z-index': props.zIndex,
    }"
  >
    <template v-for="object in props.objects">
      <LottieAnimation
        v-if="object.object"
        :animation-data="object.object"
        :auto-play="true"
        :loop="object.loop"
        :speed="object.speed"
        class="c-lottie_canvas__icon"
        :style="{
          '--x': object.position.px,
          '--y': object.position.py,
          width: object.width + '%',
          height: object.height + '%',
          '--duration': object.animation?.duration + 's',
          '--iteration': object.animation?.iteration,
        }"
        :class="
          !object.animation
            ? ''
            : [
                `a-${object.animation?.type}`,
                { 'a-infinite': object.animation?.iteration <= 0 },
              ]
        "
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import { LottieAnimation } from "lottie-web-vue";

const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  objects: {
    type: Array<GOULottie>,
    default: () => [],
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
  &__icon {
    position: absolute;
    top: calc(var(--y) * 1%);
    left: calc(var(--x) * 1%);
  }
}
</style>
